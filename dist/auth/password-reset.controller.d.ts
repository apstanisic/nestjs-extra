import { BaseService } from '../base.service';
import { BaseUser } from '../users/base-user.entity';
import { AuthMailService } from './auth-mail.service';
import { ResetPasswordDto } from './auth.dto';
import { PasswordResetService } from './password-reset.service';
import { Email } from '../types';
export declare class PasswordResetController {
    private readonly authMailService;
    private readonly passwordResetService;
    private readonly usersService;
    constructor(authMailService: AuthMailService, passwordResetService: PasswordResetService, usersService: BaseService<BaseUser>);
    sendPasswordRecoveryMail(email: Email): Promise<{
        message: string;
        success: true;
    }>;
    resetPassword(email: Email, { password, token }: ResetPasswordDto): Promise<BaseUser>;
}
