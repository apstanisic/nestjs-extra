import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { random } from 'faker';
import { Column, Index, Unique } from 'typeorm';
import * as moment from 'moment';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { IUser } from './user.interface';

/**
 * This should be general user that can be extracted in seperate module.
 * There should be another entity User that contains app specific properties.
 */
@Unique(['email'])
export class BaseUser extends BaseEntity implements IUser {
  /** User Email, has to be unique and to be valid email */
  @Column()
  @Index({ unique: true })
  @IsEmail()
  email: string;

  /** Users password */
  @Column({ name: 'password' })
  @IsString()
  // @Length(6, 50)
  @Exclude()
  _password: string;

  /** User real name */
  @Column()
  @IsString()
  @Length(2, 100)
  name: string;

  /** User's profile picture */
  @Column({ nullable: true, type: 'simple-json' })
  @IsOptional()
  avatar?: Image;

  /** Did user confirm his account */
  @Column({ default: false })
  @Exclude()
  confirmed: boolean;

  /** Can be used to confirm user, reset password, etc... */
  @Column({ nullable: true })
  @Exclude()
  secureToken?: string;

  /** Time when secureToken was created. Server decides token duration */
  @Column({ nullable: true, precision: 3 })
  @Exclude()
  tokenCreatedAt?: Date;

  /** Set new password and hash it automatically */
  set password(newPassword: string) {
    if (newPassword.length > 50) {
      throw new BadRequestException('Password is to long');
    }
    this._password = bcrypt.hashSync(newPassword);
  }

  /** Check if provided password is valid */
  checkPassword(enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this._password);
  }

  // /**
  //  *
  //  * @param prepend String to be added at beginning of token for
  //  * special cases. For example to store new
  //  */
  /** Generate secure token to be used for password reset... */
  generateSecureToken(prepend: string = ''): string {
    this.secureToken = `${prepend}___${random.uuid()}`;
    this.tokenCreatedAt = new Date();
    return this.secureToken;
  }

  /** Call this method after token is used */
  removeSecureToken(): void {
    this.secureToken = undefined;
    this.tokenCreatedAt = undefined;
  }

  /** Check if provided token is valid. Max duration is 1 year */
  validToken(token: string, duration?: moment.Duration): boolean {
    if (!this.secureToken) return false;
    if (!this.tokenCreatedAt) return false;
    if (this.secureToken !== token) return false;

    const expired = moment(this.createdAt)
      .add(duration ?? moment.duration(1, 'year'))
      .isBefore(moment());
    if (expired) return false;

    return true;
  }
}
