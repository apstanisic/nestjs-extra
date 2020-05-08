import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { JwtGuard } from '../auth/jwt-guard';
import { PaginationParams } from '../pagination/pagination-options';
import { GetPagination } from '../pagination/pagination.decorator';
import { PgResult } from '../pagination/pagination.types';
import { ValidUUID } from '../pipes/uuid.pipe';
import { UUID } from '../types';
import { AuthUser } from '../users/user.interface';
import { Notification } from './notification.entity';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtGuard)
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  /**
   * Get paginated result of notifications
   * It has to be paginated cause user can have 1000s of notifications
   */
  @Get()
  find(@GetPagination() params: PaginationParams): PgResult<Notification> {
    return this.service.paginate({ ...params });
  }

  /**
   * Set notification as "seen"
   */
  @Put(':id')
  async seeNotification(
    @Param('id', ValidUUID) id: UUID,
    @GetUser() user: AuthUser,
  ): Promise<Notification> {
    return this.service.updateWhere({ id, userId: user.id }, { seenAt: new Date() });
  }

  /**
   * Delete notification
   */
  @Delete(':id')
  async deleteNotification(
    @Param('id', ValidUUID) id: UUID,
    @GetUser() user: AuthUser,
  ): Promise<Notification> {
    return this.service.deleteWhere({ id, userId: user.id });
  }
}
