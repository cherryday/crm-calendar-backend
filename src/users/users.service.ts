import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor() // @InjectRepository(UserEntity)
  // private userRepository: Repository<UserEntity>,
  {}

  // create(createUserDto: SignupDto): Promise<UserEntity> {
  //   const user = this.userRepository.create(createUserDto);
  //   return this.userRepository.save(user);
  // }

  // findByEmail(email: string): Promise<UserEntity> {
  //   return this.userRepository.findOne({ where: { email } });
  // }
}
