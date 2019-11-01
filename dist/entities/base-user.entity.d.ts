import { BaseEntity } from './base.entity';
import { IUser } from './user.interface';
import { ImageSizes } from '../types';
export declare class BaseUser extends BaseEntity implements IUser {
    email: string;
    _password: string;
    name: string;
    avatar?: ImageSizes;
    confirmed: boolean;
    secureToken?: string;
    tokenCreatedAt?: Date;
    password: string;
    checkPassword(enteredPassword: string): Promise<boolean>;
    generateSecureToken(): string;
    disableSecureToken(): void;
    compareToken(token: string): boolean;
}