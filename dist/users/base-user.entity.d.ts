import * as moment from 'moment';
import { UuidEntity } from '../entities/base-uuid.entity';
import { Image } from '../entities/image.entity';
import { IUser } from './user.interface';
export declare class BaseUser extends UuidEntity implements IUser {
    email: string;
    password: string;
    name: string;
    avatar?: Image;
    confirmed: boolean;
    token?: string;
    tokenCreatedAt?: Date;
    setPassword(newPassword: string): Promise<void>;
    checkPassword(enteredPassword: string): Promise<boolean>;
    generateSecureToken(prepend?: string): string;
    removeSecureToken(): void;
    validToken(token: string, duration?: moment.Duration): boolean;
}
