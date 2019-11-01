import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Validator } from 'class-validator';
import { AC_ROLES_LIST } from '../consts';

/**
 * Get correct role from request
 * @example
 *   method(@Param('id', ValidRole) role: RoleName) {}
 */
@Injectable()
export class ValidRole implements PipeTransform<string, string> {
  constructor(@Inject(AC_ROLES_LIST) private roles: string[]) {}

  private validator = new Validator();

  transform(value: string): string {
    if (
      !this.validator.isString(value) ||
      !this.validator.isIn(value, this.roles)
    ) {
      throw new BadRequestException('Role does not exist');
    }

    return value;
  }
}
