import * as Faker from 'faker';
import { BaseUserWithRoles } from '../entities/base-user-with-roles.entity';
import { UUID } from '../types';
import { Role } from './roles.entity';

const random = Faker.random.arrayElement;

export function generateRole(
  users: BaseUserWithRoles[],
  domain: UUID[] = [],
): Role {
  const role = new Role();
  role.userId = random(users).id;
  role.name = random(['admin', 'user', 'guest', 'app_admin', 'app_owner']);
  role.domain = random(domain);

  return role;
}

export function generateUserRole(user: BaseUserWithRoles): Role {
  const role = new Role();
  role.userId = user.id;
  role.name = random(['admin', 'user', 'guest', 'app_admin', 'app_owner']);
  role.domain = user.id;

  return role;
}
