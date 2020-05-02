import { Injectable, NotImplementedException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { LessThan } from 'typeorm';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationsCronService {
  constructor(private readonly notificationService: NotificationService) {}

  /** Deletes old notifications after six months every 12 hours */
  @Cron('0 */12 * * *')
  async deleteOldNotifications(): Promise<void> {
    await this.notificationService.deleteOldNotifications();
  }
}
