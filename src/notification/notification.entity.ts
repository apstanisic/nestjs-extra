import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseUser } from '../entities/base-user.entity';
import { UUID } from '../types';
// import { User } from '../../user/user.entity';

@Entity('notifications')
export class Notification<User = BaseUser> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @ManyToOne('User', { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: UUID;

  @Column({ precision: 3 })
  seenAt?: Date;

  @CreateDateColumn({ precision: 3 })
  createdAt: Date;
}
