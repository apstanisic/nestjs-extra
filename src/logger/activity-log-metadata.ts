import { IdType, WithId } from '../types';
import { BasicUserInfo } from '../users/user.interface';

/**
 * Info that should be passed to LogService.
 * It contains info that is important for logging.
 */
export interface ActivityLogMetadata<User extends BasicUserInfo = BasicUserInfo> {
  /** User that executes the action */
  user: User;
  /** Optional reason for action */
  reason?: string;
  /** Optional domain at which action is executed. If promided object app will extract id */
  domain?: WithId | IdType;
}
