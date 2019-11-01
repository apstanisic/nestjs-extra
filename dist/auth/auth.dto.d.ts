import { BaseUser } from '../entities/base-user.entity';
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class OnlyPasswordDto {
    password: string;
}
export declare class ResetPasswordDto {
    password: string;
    token: string;
}
export declare class RegisterUserDto extends LoginUserDto {
    name: string;
}
export declare class UpdatePasswordDto {
    email: string;
    oldPassword: string;
    newPassword: string;
}
export declare class SignInResponse {
    token: string;
    user: BaseUser;
}
