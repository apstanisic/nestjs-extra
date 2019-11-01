import { WithId, UUID } from '../types';
import { IUser, BasicUserInfo } from '../entities/user.interface';
export interface LogMetadata {
    user: BasicUserInfo | IUser;
    reason?: string;
    domain?: WithId | UUID;
}
