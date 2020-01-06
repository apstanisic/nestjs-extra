import { IsEmail, IsNotEmpty, Length, IsUUID } from 'class-validator';
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

/** When reseting password, only new password is needed */
export class OnlyPasswordDto {
  @IsNotEmpty()
  @Length(8, 50)
  password: string;
}

export class ResetPasswordDto {
  @Length(8, 50)
  password: string;

  @IsUUID()
  token: string;
}

export class RegisterUserDto extends LoginUserDto {
  @Length(2, 100)
  name: string;
}

/** Data that is provided when changing password */
export class UpdatePasswordDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  oldPassword: string;

  @Length(8, 50)
  newPassword: string;
}

/** Data that is provided when changing email */
export class ChangeEmailDto {
  @IsEmail()
  newEmail: string;

  @Length(8, 50)
  password: string;
}

/** Server response for successful login */
export class SignInResponse {
  token: string;
  user: BaseUser;
}
