import { OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseUser } from './base-user.entity';
import { Role } from '../role/roles.entity';

/** In cases where roles are needed use this */
export class BaseUserWithRoles extends BaseUser {
  /** All roles user have */
  @OneToMany(type => Role, role => role.userId)
  @Exclude()
  roles: Role[];
}
