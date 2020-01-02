import { NotificationService } from './notification.service';
export declare class NotificationCronService {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    deleteOldNotifications(): Promise<void>;
}
