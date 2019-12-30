import { Expose } from 'class-transformer';
import { ImageSizes } from '../types';
import { Image } from './image.entity';

/** User must always have this fields */
export interface IUser extends BasicUserInfo {
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
  /** @todo See should i expose this. It takes to much space in db */
  avatar?: string | ImageSizes | Image;
}

export interface IBasicUserInfo extends BasicUserInfo {}
