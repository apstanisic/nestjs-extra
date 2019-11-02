import { Exclude } from 'class-transformer';
import { OneToMany } from 'typeorm';
import { Role } from '../access-control/role/roles.entity';
import { BaseUser } from './base-user.entity';

/** In cases where roles are needed use this */
export class BaseUserWithRoles extends BaseUser {
  /** All roles user have */
  @OneToMany(type => Role, role => role.userId)
  @Exclude()
  roles: Role[];
}
