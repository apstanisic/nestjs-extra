import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsCron {
  constructor(private readonly notificationService: NotificationsService) {}

  /** Deletes old notifications after six months every 2 hours */
  @Cron('0 */2 * * *')
  async deleteOldNotifications(): Promise<void> {
    await this.notificationService.deleteOldNotifications();
  }
}
