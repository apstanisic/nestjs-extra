import { WithId, UUID } from '../types';
import { IUser, BasicUserInfo } from '../users/user.interface';
export interface DbLogMetadata {
    user: BasicUserInfo | IUser;
    reason?: string;
    domain?: WithId | UUID;
}
