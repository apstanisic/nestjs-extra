import { BaseUser } from '../users/base-user.entity';
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class SignInResponse {
    token: string;
    user: BaseUser;
    refreshToken: string;
}
