import { Column, Index, ManyToOne } from 'typeorm';
import { UuidEntity } from '../entities/base-uuid.entity';
import { IdType } from '../types';
import { BaseUser } from '../users/base-user.entity';
import moment = require('moment');

export class AuthSession<User extends BaseUser> extends UuidEntity {
  /** User that have this role */
  @ManyToOne('User', { onDelete: 'CASCADE' })
  user: User;

  /** User's id */
  @Column()
  @Index()
  userId: IdType;

  /** User's email */
  @Column()
  email: string;

  /** Token to check if session is valid */
  @Column()
  refreshToken: string;

  /** Ip this session was used. */
  @Column({ nullable: true })
  location: string;

  /** When was last time new access token was generated */
  @Column()
  lastUsed: Date;

  @Column({ default: moment().add(1, 'year').toDate() })
  validUntil: Date;

  /** Is this session valid */
  @Column({ default: true })
  valid: boolean;
}
