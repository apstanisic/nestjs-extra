import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { LessThan } from 'typeorm';
import { CronService } from '../cron/cron.service';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationCronService {
  /** Cron job */

  constructor(
    private readonly notificationService: NotificationService,
    private readonly cronService: CronService,
  ) {
    this.cronService.startJob('0 5 * * *', this.deleteOldNotifications);
  }

  /** Deletes old notifications after six months. This should be done in cron */
  private async deleteOldNotifications(): Promise<void> {
    const sixMonthsBefore = moment()
      .subtract(6, 'months')
      .toDate();

    await this.notificationService.deleteMany({
      createdAt: LessThan(sixMonthsBefore),
    });
  }
}
