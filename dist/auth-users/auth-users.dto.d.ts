export declare class OnlyPasswordDto {
    password: string;
}
export declare class RegisterUserDto extends OnlyPasswordDto {
    email: string;
    name: string;
}
export declare class UpdatePasswordDto {
    email: string;
    oldPassword: string;
    newPassword: string;
}
