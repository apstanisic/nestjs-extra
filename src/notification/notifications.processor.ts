import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NOTIFICATIONS } from '../consts';
import { NotificationService } from './notification.service';
import { DELETE_OLD_NOTIFICATION_JOB } from './notifications.consts';

@Processor(QUEUE_NOTIFICATIONS)
export class NotificationsProcessor {
  constructor(private readonly notificationService: NotificationService) {}

  @Process(DELETE_OLD_NOTIFICATION_JOB)
  async deleteOldNotifications(job: Job): Promise<void> {
    await this.notificationService.deleteOldNotifications();
  }
}
