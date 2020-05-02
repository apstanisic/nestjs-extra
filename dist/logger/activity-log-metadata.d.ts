import { IdType, WithId } from '../types';
import { BasicUserInfo } from '../users/user.interface';
export interface ActivityLogMetadata<User extends BasicUserInfo = BasicUserInfo> {
    user: User;
    reason?: string;
    domain?: WithId | IdType;
}
