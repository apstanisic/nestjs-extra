import { CronService } from '../cron/cron.service';
import { NotificationService } from './notification.service';
export declare class NotificationCronService {
    private readonly notificationService;
    private readonly cronService;
    constructor(notificationService: NotificationService, cronService: CronService);
    private deleteOldNotifications;
}
