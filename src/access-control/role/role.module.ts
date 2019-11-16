import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { Role } from './roles.entity';
import { ROLE_SERVICE } from '../../consts';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, { provide: ROLE_SERVICE, useClass: RoleService }],
  exports: [RoleService, { provide: ROLE_SERVICE, useClass: RoleService }],
})
export class RoleModule {}
