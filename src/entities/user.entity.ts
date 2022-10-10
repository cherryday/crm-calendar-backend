import { UserSessionEntity } from 'src/entities/user-session.entity';
import { Role } from 'src/enums/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VacationEntity } from './vacation.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => VacationEntity, (vacation) => vacation.user)
  vacations;

  @OneToMany(() => UserSessionEntity, (session) => session.user)
  sessions: UserSessionEntity[];
}
