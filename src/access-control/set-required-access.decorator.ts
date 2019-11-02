import { SetMetadata } from '@nestjs/common';

export interface AccessOptions {
  action: 'read' | 'write';
  resource?: string;
}

/**
 * Set custom access requirements
 *
 * @example
 *  @SetRequiredAccess({action: 'write', resource: '/companies/412412'})
 */
export function SetRequiredAccess(options: AccessOptions): any {
  return SetMetadata('access_control', options);
}
