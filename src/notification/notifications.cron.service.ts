import { Injectable, NotImplementedException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { LessThan } from 'typeorm';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationsCronService {
  constructor(private readonly notificationService: NotificationService) {}

  /** Deletes old notifications after six months */
  @Cron('0 5 * * *')
  async deleteOldNotifications(): Promise<void> {
    await this.notificationService.deleteOldNotifications();
  }
}
