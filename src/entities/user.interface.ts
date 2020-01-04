import { Expose } from 'class-transformer';
import { Image } from './image.entity';

/** User must always have this properties */
export interface IUser {
  id: string;
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

/** User will always have this fields when returned. Avatar is optional */
export class BasicUserInfo {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  phoneNumber?: string;
}
