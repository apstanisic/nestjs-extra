import { Enforcer } from 'casbin';
import { Role } from './role/roles.entity';
export declare class AccessControlService {
    enforcer: Enforcer;
    constructor(casbinModelText: string, casbinPolicies: string);
    isAllowed(roles: Role[], resourcePath: string, action?: string): Promise<boolean>;
}
