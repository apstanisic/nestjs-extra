import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { LessThan } from 'typeorm';
import { NotificationService } from './notification.service';

/** @Todo Maybe add to bullmq to do this */
@Injectable()
export class NotificationsCronService {
  constructor(private readonly notificationService: NotificationService) {}

  /** Deletes old notifications after six months. This should be done in cron */
  @Cron('0 5 * * *')
  async deleteOldNotifications(): Promise<void> {
    const sixMonthsBefore = moment()
      .subtract(6, 'months')
      .toDate();

    await this.notificationService.deleteMany({
      createdAt: LessThan(sixMonthsBefore),
    });
  }
}
