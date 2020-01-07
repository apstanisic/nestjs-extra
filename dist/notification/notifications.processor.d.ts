import { Job } from 'bull';
import { NotificationService } from './notification.service';
export declare class NotificationsProcessor {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    deleteOldNotifications(job: Job): Promise<void>;
}
