import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from '../types';

/** Domain is provided trough url param. */
/** @TODO Do validation for role name */
export class RoleDto {
  @IsString()
  @IsUUID()
  userId?: UUID;

  /** @TODO There should be some validation */
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

/** Some fields that are nullable at parent class here aren't */
export class CreateRoleDto extends RoleDto {
  userId: string;

  name: string;

  description?: string;
}

/** All fields are optional */
export class UpdateRoleDto extends RoleDto {
  @IsOptional()
  userId?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;
}
