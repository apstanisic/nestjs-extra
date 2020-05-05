import { BaseService } from '../base.service';
import { Email } from '../types';
import { BaseUser } from '../users/base-user.entity';
import { PasswordResetService } from './password-reset.service';
export declare class ResetPasswordDto {
    password: string;
    token: string;
}
export declare class PasswordResetController {
    private readonly usersService;
    private readonly service;
    constructor(usersService: BaseService<BaseUser>, service: PasswordResetService);
    resetPassword(email: Email, { password, token }: ResetPasswordDto): Promise<BaseUser>;
    sendPasswordRecoveryMail(email: Email): Promise<{
        message: string;
        success: true;
    }>;
}
