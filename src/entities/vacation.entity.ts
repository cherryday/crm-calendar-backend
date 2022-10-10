import { VacationStatus } from 'src/enums/vacation-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('vacations')
export class VacationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: VacationStatus,
    default: VacationStatus.Pending,
  })
  status: VacationStatus;

  @ManyToOne(() => UserEntity, (user) => user.vacations)
  user: UserEntity;
}
