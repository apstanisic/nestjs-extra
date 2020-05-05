import { IsEmail, Length } from 'class-validator';

/** Data that is provided when changing email */
export class ChangeEmailDto {
  @IsEmail()
  newEmail: string;

  @Length(8, 50)
  password: string;
}
