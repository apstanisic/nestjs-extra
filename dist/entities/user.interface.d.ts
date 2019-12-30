import { ImageSizes } from '../types';
import { Image } from './image.entity';
export interface IUser extends BasicUserInfo {
    confirmed: boolean;
    secureToken?: string;
    tokenCreatedAt?: Date;
    password: string;
    checkPassword: (password: string) => Promise<boolean> | boolean;
}
export declare class BasicUserInfo {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    avatar?: string | ImageSizes | Image;
}
export interface IBasicUserInfo extends BasicUserInfo {
}
