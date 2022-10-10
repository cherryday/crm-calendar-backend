import { UserEntity } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_sessions')
export class UserSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;

  @Column({ type: 'bigint' })
  expiresIn: number;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user: UserEntity;
}
