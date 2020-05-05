import { IsEmail, IsNotEmpty, Length, IsUUID } from 'class-validator';
import { BaseUser } from '../users/base-user.entity';

/** When reseting password, only new password is needed */
export class OnlyPasswordDto {
  @IsNotEmpty()
  @Length(8, 50)
  password: string;
}

export class RegisterUserDto extends OnlyPasswordDto {
  @IsEmail()
  email: string;

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
