import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSessionEntity } from './user-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSessionEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
