import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UUID } from '../../types';

/** Domain is provided trough url param. */
export class RoleDto {
  @IsString()
  @IsUUID()
  userId?: UUID;

  /** @warning There must be runtime validation to see if role exists */
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
