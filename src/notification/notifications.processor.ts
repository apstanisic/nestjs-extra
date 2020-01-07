import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NOTIFICATIONS } from '../consts';
import { NotificationService } from './notification.service';

@Processor(QUEUE_NOTIFICATIONS)
export class NotificationsProcessor {
  constructor(private readonly notificationService: NotificationService) {}

  @Process('delete-old')
  async deleteOldNotifications(job: Job): Promise<void> {
    await this.notificationService.deleteOldNotifications();
  }
}
