import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { v4 } from 'uuid';
import { UserEntity } from 'src/users/user.entity';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserSessionEntity } from './user-session.entity';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserSessionEntity)
    private userSessionRepository: Repository<UserSessionEntity>,
  ) {}

  async signin(signinDto: SigninDto, response: Response) {
    const user = await this.userRepository.findOneBy({
      email: signinDto.email,
    });

    if (!user) {
      throw new BadRequestException('wrong email or password');
    }

    const isValidPassword = await bcrypt.compare(
      signinDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('wrong email or password');
    }

    const accessToken = jsonwebtoken.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '5m',
      },
    );

    const refreshToken = v4();

    const userSession = this.userSessionRepository.create({
      user,
      refreshToken,
      expiresIn: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    });
    await this.userSessionRepository.save(userSession);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/auth',
    });

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const user = await this.userRepository.findOneBy({
      email: signupDto.email,
    });

    if (user) {
      throw new BadRequestException('user with this email already exists');
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(signupDto.password, salt);

    const newUser = this.userRepository.create({
      ...signupDto,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return 'signup';
  }

  async refresh(request: Request, response: Response) {
    const refreshToken = await this.userSessionRepository.findOne({
      where: { refreshToken: request.cookies.refreshToken },
      relations: ['user'],
    });
    await this.userSessionRepository.delete(refreshToken);

    const accessToken = jsonwebtoken.sign(
      { email: refreshToken.user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '5m',
      },
    );

    const newRefreshToken = v4();

    const userSession = this.userSessionRepository.create({
      user: refreshToken.user,
      refreshToken: newRefreshToken,
      expiresIn: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    });
    await this.userSessionRepository.save(userSession);

    response.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      path: '/api/auth',
    });

    return { accessToken };
  }
}
