import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { BaseService } from '../base.service';
import { BaseUser } from '../entities/base-user.entity';
// import { User } from "../../user/user.entity";
// import { UsersService } from "../../user/user.service";
import { ValidEmail } from '../validate-email.pipe';
import { AuthMailService } from './auth-mail.service';
import { ResetPasswordDto } from './auth.dto';
import { PasswordResetService } from './password-reset.service';
import { USER_SERVICE } from '../consts';
import { Email } from '../types';

/** Controller for password reseting */
@Controller('auth')
export class PasswordResetController {
  constructor(
    private readonly authMailService: AuthMailService,
    private readonly passwordResetService: PasswordResetService,
    @Inject(USER_SERVICE) private readonly usersService: BaseService<BaseUser>,
  ) {}

  /**
   * Send email with reset instruction.
   * This is async, but there is no need to wait.
   * User should not know if account with given email exist.
   * Always return success. Even if it throws error, return success.
   */
  @Post('forgot-password/:email')
  async sendPasswordRecoveryMail(
    @Param('email', ValidEmail) email: Email,
  ): Promise<{ message: string; success: true }> {
    this.authMailService.sendResetPasswordEmail(email);
    return { success: true, message: 'Password reset email is sent.' };
  }

  /**
   * Method that reset the user password and sets it in db.
   * Frontend should call this method. It must be post request.
   */
  @Post('reset-password/:email/:token')
  async resetPassword(
    @Param('email', ValidEmail) email: Email,
    @Body() { password, token }: ResetPasswordDto,
  ): Promise<BaseUser> {
    const user = await this.usersService.findOne({ email });
    return this.passwordResetService.resetPassword(user, token, password);
  }
}
