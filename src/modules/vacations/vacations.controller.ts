import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacationEntity } from 'src/entities/vacation.entity';
import { Repository } from 'typeorm';

@Controller('vacations')
export class VacationsController {
  constructor(
    @InjectRepository(VacationEntity)
    private vacationRepository: Repository<VacationEntity>,
  ) {}

  @Get()
  getAll() {
    return [];
  }
}
