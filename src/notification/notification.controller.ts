import { Controller, Put, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ValidUUID } from '../uuid.pipe';
import { UUID } from '../types';
import { Notification } from './notification.entity';
import { GetUser } from '../auth/get-user.decorator';
import { IUser } from '../entities/user.interface';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /** Set notification as "seen" */
  @Put(':id')
  async seeNotification(
    @Param('id', ValidUUID) id: UUID,
    @GetUser() user: IUser,
  ): Promise<Notification> {
    return this.notificationService.updateWhere({ id, userId: user.id }, { seenAt: new Date() });
  }

  /** Delete notification */
  @Delete(':id')
  async deleteNotification(
    @Param('id', ValidUUID) id: UUID,
    @GetUser() user: IUser,
  ): Promise<Notification> {
    return this.notificationService.deleteWhere({ id, userId: user.id });
  }
}
