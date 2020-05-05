import { Column, Index, ManyToOne, Entity } from 'typeorm';
import { UuidEntity } from '../entities/base-uuid.entity';
import { IdType } from '../types';
import { BaseUser } from '../users/base-user.entity';
import * as moment from 'moment';

@Entity('auth_sessions')
export class AuthSession<User extends BaseUser> extends UuidEntity {
  /** User that have this role */
  @ManyToOne('User', { onDelete: 'CASCADE' })
  user: User;

  /** User's id */
  @Column()
  @Index()
  userId: IdType;

  /**
   * Session name, user can set to remember device
   * @TODO Not used for now
   */
  @Column({ nullable: true })
  name: string;

  /** User's email */
  @Column()
  email: string;

  /** Token to check if session is valid */
  @Column()
  refreshToken: string;

  /** Ip this session was used. */
  @Column({ nullable: true })
  ip: string;

  /** Browser used */
  @Column({ nullable: true })
  browser?: string;

  /** Os used */
  @Column({ nullable: true })
  os?: string;

  /** When was last time new access token was generated */
  @Column()
  lastUsed: Date;

  @Column({ default: moment().add(6, 'months').toDate() })
  validUntil: Date;

  /** Is this session valid */
  @Column({ default: true })
  valid: boolean;
}
