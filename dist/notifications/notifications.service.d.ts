import { Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { UUID } from '../types';
import { Notification } from './notification.entity';
interface AddNotificationParams {
    title: string;
    body?: string;
    userId: UUID;
}
export declare class NotificationsService extends BaseService<Notification> {
    constructor(repository: Repository<Notification>);
    addNotification({ title, body, userId }: AddNotificationParams): Promise<Notification>;
    deleteOldNotifications(): Promise<void>;
}
export {};
