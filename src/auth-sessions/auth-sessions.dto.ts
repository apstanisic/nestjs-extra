import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { BaseUser } from '../users/base-user.entity';

/** Data provided for login */
export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 50)
  password: string;
}

/** Server response for successful login */
export class SignInResponse {
  token: string;
  user: BaseUser;
}
