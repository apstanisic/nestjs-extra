import { Image } from '../entities/image.entity';
export interface IUser {
    id: string | number;
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
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
}
