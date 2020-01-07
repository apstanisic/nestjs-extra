import { InjectQueue } from '@nestjs/bull';
import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import * as moment from 'moment';
import { DeleteResult, FindConditions, LessThan, Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { QUEUE_NOTIFICATIONS } from '../consts';
import { UUID } from '../types';
import { Notification } from './notification.entity';

interface AddNotificationParams {
  title: string;
  body?: string;
  userId: UUID;
}

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(
    @InjectRepository(Notification) repository: Repository<Notification>,
    @Optional() @InjectQueue(QUEUE_NOTIFICATIONS) queue?: Queue,
  ) {
    super(repository);

    // If using mq register job
    if (queue) {
      queue.add('delete-old', null, { repeat: { cron: '0 */12 * * *' } });
    }
  }

  /** Delete many notifications. Expose deleteMany because of cron job */
  deleteMany(criteria: FindConditions<Notification>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  /** Create new notification */
  async addNotification({ title, body, userId }: AddNotificationParams): Promise<Notification> {
    return this.create({ body, title, userId });
  }

  /** Used for cron or mq to delete old notifications */
  async deleteOldNotifications(): Promise<void> {
    const sixMonthsBefore = moment()
      .subtract(6, 'months')
      .toDate();

    await this.deleteMany({
      createdAt: LessThan(sixMonthsBefore),
    });
  }
}
