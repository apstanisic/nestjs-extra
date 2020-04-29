import { WithId, UUID } from '../types';
import { IUser, BasicUserInfo } from '../users/user.interface';
export interface DbLogMetadata<User extends BasicUserInfo | IUser = IUser> {
    user: User;
    reason?: string;
    domain?: WithId | UUID | number;
}
