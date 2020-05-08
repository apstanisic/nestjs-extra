import { PaginationParams } from '../pagination/pagination-options';
import { PgResult } from '../pagination/pagination.types';
import { UUID } from '../types';
import { AuthUser } from '../users/user.interface';
import { Notification } from './notification.entity';
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly service;
    constructor(service: NotificationsService);
    find(params: PaginationParams): PgResult<Notification>;
    seeNotification(id: UUID, user: AuthUser): Promise<Notification>;
    deleteNotification(id: UUID, user: AuthUser): Promise<Notification>;
}
