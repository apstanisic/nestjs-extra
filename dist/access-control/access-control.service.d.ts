import { Role } from './role/roles.entity';
export declare class AccessControlService {
    private enforcer;
    constructor(casbinModelText: string, casbinPolicies: string);
    isAllowed(roles: Role[], resourcePath: string, action?: string): Promise<boolean>;
}
