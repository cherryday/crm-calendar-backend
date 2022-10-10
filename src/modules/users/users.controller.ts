import { Controller, Get } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.usersService.getAll();
  }
}
