import { ImageSizes } from '../types';
export interface IUser extends BasicUserInfo {
    id: string;
    email: string;
    name: string;
    avatar?: string | ImageSizes;
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
    avatar?: string | ImageSizes;
}
export interface IBasicUserInfo extends BasicUserInfo {
}
