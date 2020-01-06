import * as moment from 'moment';
import { BaseEntity } from '../entities/base.entity';
import { Image } from '../entities/image.entity';
import { IUser } from './user.interface';
export declare class BaseUser extends BaseEntity implements IUser {
    email: string;
    password: string;
    name: string;
    avatar?: Image;
    confirmed: boolean;
    secureToken?: string;
    tokenCreatedAt?: Date;
    setPassword(newPassword: string): Promise<void>;
    checkPassword(enteredPassword: string): Promise<boolean>;
    generateSecureToken(prepend?: string): string;
    removeSecureToken(): void;
    validToken(token: string, duration?: moment.Duration): boolean;
}
