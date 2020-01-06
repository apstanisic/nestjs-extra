import { Repository, FindConditions, DeleteResult } from 'typeorm';
import { Role } from './roles.entity';
import { BaseService } from '../../base.service';
export declare class RolesService extends BaseService<Role> {
    constructor(repository: Repository<Role>);
    deleteMany(criteria: FindConditions<Role>): Promise<DeleteResult>;
}
