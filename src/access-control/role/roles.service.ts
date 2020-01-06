import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, DeleteResult } from 'typeorm';
import { Role } from './roles.entity';
import { BaseService } from '../../base.service';

@Injectable()
export class RolesService extends BaseService<Role> {
  constructor(@InjectRepository(Role) repository: Repository<Role>) {
    super(repository);
  }

  /** Delete many notifications. Expose deleteMany because of cron job */
  deleteMany(criteria: FindConditions<Role>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }
}
