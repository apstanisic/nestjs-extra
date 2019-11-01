import { Injectable, Inject } from '@nestjs/common';
import { Enforcer, newEnforcer, StringAdapter, newModel } from 'casbin';
import { casbinValidDomain } from './casbin-valid-domain';
import { AC_MODEL, AC_POLICIES } from '../consts';
import { Role } from './role/roles.entity';

@Injectable()
export class AccessControlService {
  enforcer: Enforcer;

  constructor(
    @Inject(AC_MODEL) casbinModelText: string,
    @Inject(AC_POLICIES) casbinPolicies: string,
  ) {
    const casbinModel = newModel();
    casbinModel.loadModelFromText(casbinModelText);

    const stringAdapter = new StringAdapter(casbinPolicies);

    newEnforcer(casbinModel, stringAdapter).then(enforcer => {
      this.enforcer = enforcer;
      this.enforcer.addFunction('validDomain', casbinValidDomain);
    });
  }

  /**
   * For every user role will check if fullfills enforcer requirements
   * @param user User for which roles you want to check
   * @param resourcePath Resource you want to access
   * Can be /company/comp-id or /user/user-id
   * @param action Action you want to perform on resource: read, write...
   */
  async isAllowed(
    // user: User,
    roles: Role[],
    resourcePath: string,
    action: string = 'write',
  ): Promise<boolean> {
    const checks: Promise<boolean>[] = [];
    roles.forEach(role => {
      checks.push(
        this.enforcer.enforce(role.name, role.domain, resourcePath, action),
      );
    });
    const responses = await Promise.all(checks);

    return responses.some(response => response);
  }
}
