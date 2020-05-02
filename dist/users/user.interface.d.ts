import { Image } from '../entities/image.entity';
import { IdType } from '../types';
export interface IUser extends BasicUserInfo {
    id: IdType;
    name: string;
    email: string;
    phoneNumber?: string;
    avatar?: Image;
    confirmed: boolean;
    secureToken?: string;
    tokenCreatedAt?: Date;
    password: string;
    checkPassword: (password: string) => Promise<boolean> | boolean;
}
export declare class BasicUserInfo {
    id: IdType;
    name: string;
    email: string;
    phoneNumber?: string;
}
