/// <reference types="node" />
import { Repository } from 'typeorm';
import { LoginUserDto } from '../auth-sessions/auth-sessions.dto';
import { RegisterUserDto, UpdatePasswordDto } from '../auth-users/auth-users.dto';
import { BaseService } from '../base.service';
import { BaseUser } from './base-user.entity';
interface BaseUserServiceOptions {
    useRoles: boolean;
    useAvatar: boolean;
}
export declare class BaseUserService<User extends BaseUser = BaseUser> extends BaseService<User> {
    constructor(repository: Repository<User>, options?: Partial<BaseUserServiceOptions>);
    private useAvatar;
    private useRoles;
    private readonly storageImagesService?;
    private readonly roleService?;
    createUser({ email, password, name }: RegisterUserDto): Promise<User>;
    findForLogin(email: string, password: string): Promise<User>;
    changePassword(data: UpdatePasswordDto): Promise<User>;
    changeEmail(user: User, token: string): Promise<any>;
    deleteAccount({ email, password }: LoginUserDto): Promise<any>;
    changeAvatar(user: User, newAvatar: Buffer): Promise<User>;
    removeAvatar(user: User): Promise<User>;
}
export {};
