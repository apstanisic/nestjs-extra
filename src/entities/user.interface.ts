import { ImageSizes } from "../types";

/** User must always have this fields */
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

/** User will always have this fields when returned. Avatar is optional */
export class BasicUserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string | ImageSizes;
}

// export interface IBasicUserInfo extends BasicUserInfo {}
