import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { BaseService } from '../base.service';
export declare class RoleService extends BaseService<Role> {
    constructor(repository: Repository<Role>);
}
