import { NotificationService } from './notification.service';
export declare class NotificationsCronService {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    deleteOldNotifications(): Promise<void>;
}
