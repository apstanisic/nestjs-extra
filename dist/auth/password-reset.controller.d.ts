import { AuthMailService } from './auth-mail.service';
import { ResetPasswordDto } from './auth.dto';
import { PasswordResetService } from './password-reset.service';
import { BaseService } from '../base.service';
import { BaseUser } from '../entities/base-user.entity';
export declare class PasswordResetController {
    private readonly authMailService;
    private readonly passwordResetService;
    private usersService;
    constructor(authMailService: AuthMailService, passwordResetService: PasswordResetService, usersService: BaseService<BaseUser>);
    sendPasswordRecoveryMail(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, { password, token }: ResetPasswordDto): Promise<BaseUser>;
}
