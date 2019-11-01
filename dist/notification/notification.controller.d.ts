import { NotificationService } from './notification.service';
import { UUID } from '../types';
import { Notification } from './notification.entity';
import { IUser } from '../entities/user.interface';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    seeNotification(id: UUID, user: IUser): Promise<Notification>;
    deleteNotification(id: UUID, user: IUser): Promise<Notification>;
}
