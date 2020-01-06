import { SetMetadata } from '@nestjs/common';

export interface AccessResourceOptions {
  action: 'read' | 'create' | 'update' | 'delete';
  resource?: string;
}

/**
 * Set custom access requirements
 *
 * @example
 *  @SetRequiredAccess({action: 'write', resource: '/companies/412412'})
 */
export function SetRequiredAccess(options: AccessResourceOptions): any {
  return SetMetadata('access_control', options);
}
