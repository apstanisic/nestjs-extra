import { BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { IUser } from './user.interface';
export declare class BaseUser extends BaseEntity implements IUser {
    email: string;
    _password: string;
    name: string;
    avatar?: Image;
    confirmed: boolean;
    secureToken?: string;
    tokenCreatedAt?: Date;
    set password(newPassword: string);
    checkPassword(enteredPassword: string): Promise<boolean>;
    generateSecureToken(): string;
    removeSecureToken(): void;
    validToken(token: string): boolean;
}
