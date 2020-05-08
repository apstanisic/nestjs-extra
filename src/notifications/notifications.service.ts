import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { LessThan, Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { UUID } from '../types';
import { Notification } from './notification.entity';

interface AddNotificationParams {
  title: string;
  body?: string;
  userId: UUID;
}

@Injectable()
export class NotificationsService extends BaseService<Notification> {
  constructor(@InjectRepository(Notification) repository: Repository<Notification>) {
    super(repository);
  }

  /** Create new notification */
  async addNotification({ title, body, userId }: AddNotificationParams): Promise<Notification> {
    return this.create({ body, title, userId });
  }

  /** Used for cron or mq to delete old notifications */
  async deleteOldNotifications(): Promise<void> {
    const sixMonthsBefore = moment().subtract(6, 'months').toDate();

    await this.repository.delete({ createdAt: LessThan(sixMonthsBefore) });
  }
}
