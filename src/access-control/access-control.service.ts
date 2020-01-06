import { Inject, Injectable } from '@nestjs/common';
import { Enforcer, newEnforcer, newModel, StringAdapter } from 'casbin';
import { AC_MODEL, AC_POLICIES } from '../consts';
import { casbinValidDomain } from './casbin-valid-domain';
import { Role } from './role/roles.entity';

@Injectable()
export class AccessControlService {
  private enforcer: Enforcer;

  /** Initialize Casbin with model and policies */
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
   * @param roles All roles for one user
   * @param resourcePath Resource you want to access. Can be /companies/comp-id or /users/user-id
   * @param action Action you want to perform on resource: read, write, update, delete
   */
  async isAllowed(roles: Role[], resourcePath: string, action: string = 'write'): Promise<boolean> {
    // Enforce every role
    const isAllowedPromises = roles.map(role =>
      this.enforcer.enforce(role.name, role.domain, resourcePath, action),
    );
    // Wait result
    const rolesResponses = await Promise.all(isAllowedPromises);

    // Exist role that allowed to perform action
    return rolesResponses.some(isAllowed => isAllowed);
  }
}
