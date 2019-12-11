import { Column, Index, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length, IsOptional } from 'class-validator';
import { random } from 'faker';
import { BaseEntity } from './base.entity';
import { IUser } from './user.interface';
import { ImageSizes } from '../types';

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
  @Length(6, 50)
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
  avatar?: ImageSizes;

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
    this._password = bcrypt.hashSync(newPassword);
  }

  /** Check if provided password is valid */
  checkPassword(enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this._password);
  }

  /** Generate secure token to be used for password reset... */
  generateSecureToken(): string {
    this.secureToken = random.uuid();
    this.tokenCreatedAt = new Date();
    return this.secureToken;
  }

  /** Call this method after token is used */
  removeSecureToken(): void {
    this.secureToken = undefined;
    this.tokenCreatedAt = undefined;
  }

  /** Check if provided token is valid */
  validToken(token: string): boolean {
    if (!this.secureToken) return false;
    if (!this.tokenCreatedAt) return false;
    if (this.secureToken !== token) return false;
    return true;
  }
}
