import { Exclude } from 'class-transformer';
import { OneToMany } from 'typeorm';
import { Role } from '../access-control/role/roles.entity';
import { BaseUser } from './base-user.entity';

/** In cases where user must have roles use this entity */
export class BaseUserWithRoles extends BaseUser {
  /** All roles user have */
  @Exclude()
  @OneToMany(
    type => Role,
    role => role.userId,
  )
  roles: Role[];
}
