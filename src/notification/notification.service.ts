import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindConditions, Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { UUID } from '../types';
import { Notification } from './notification.entity';

interface AddNotificationParams {
  title: string;
  body?: string;
  userId: UUID;
}

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(@InjectRepository(Notification) repository: Repository<Notification>) {
    super(repository);
  }

  /** Delete many notifications. Expose deleteMany because of cron job */
  deleteMany(criteria: FindConditions<Notification>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  /** Create new notification */
  async addNotification({ title, body, userId }: AddNotificationParams): Promise<Notification> {
    return this.create({ body, title, userId });
  }
}
