import { Column, Entity, ManyToOne } from 'typeorm';
import { UuidEntity } from '../entities/base-uuid.entity';
import { UUID, IdType } from '../types';
import { BaseUser } from '../users/base-user.entity';
// import { User } from '../../user/user.entity';

@Entity('notifications')
export class Notification<User = BaseUser> extends UuidEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @ManyToOne('User', { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: IdType;

  @Column({ precision: 3 })
  seenAt?: Date;
}
