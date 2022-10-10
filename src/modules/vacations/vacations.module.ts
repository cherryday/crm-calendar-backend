import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationEntity } from 'src/entities/vacation.entity';
import { VacationsController } from './vacations.controller';
import { VacationsService } from './vacations.service';

@Module({
  imports: [TypeOrmModule.forFeature([VacationEntity])],
  controllers: [VacationsController],
  providers: [VacationsService],
})
export class VacationsModule {}
