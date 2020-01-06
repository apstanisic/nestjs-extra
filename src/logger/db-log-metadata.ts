import { WithId, UUID } from '../types';
import { IUser, BasicUserInfo } from '../users/user.interface';

/**
 * Info that should be passed to LogService.
 * It contains info that is important for logging.
 */
export interface DbLogMetadata {
  user: BasicUserInfo | IUser;
  reason?: string;
  domain?: WithId | UUID;
}
