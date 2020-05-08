import { NotificationsService } from './notifications.service';
export declare class NotificationsCron {
    private readonly notificationService;
    constructor(notificationService: NotificationsService);
    deleteOldNotifications(): Promise<void>;
}
