import { BadRequestException, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { AC_ROLES_LIST } from '../consts';

/**
 * Get correct role from request
 * @example
 *   method(@Param('id', ValidRole) role: RoleName) {}
 */
@Injectable()
export class ValidRole implements PipeTransform<string, string> {
  constructor(@Inject(AC_ROLES_LIST) private roles: string[]) {}

  transform(value: any): string {
    if (!this.roles.includes(value)) {
      throw new BadRequestException('Invalid role');
    }

    return value;
  }
}
