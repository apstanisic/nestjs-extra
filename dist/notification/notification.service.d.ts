import { Queue } from 'bull';
import { DeleteResult, FindConditions, Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { UUID } from '../types';
import { Notification } from './notification.entity';
interface AddNotificationParams {
    title: string;
    body?: string;
    userId: UUID;
}
export declare class NotificationService extends BaseService<Notification> {
    constructor(repository: Repository<Notification>, queue?: Queue);
    deleteMany(criteria: FindConditions<Notification>): Promise<DeleteResult>;
    addNotification({ title, body, userId }: AddNotificationParams): Promise<Notification>;
    deleteOldNotifications(): Promise<void>;
}
export {};
