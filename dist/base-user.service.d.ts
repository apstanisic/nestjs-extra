/// <reference types="node" />
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { ChangeEmailDto, LoginUserDto, RegisterUserDto, UpdatePasswordDto } from './auth/auth.dto';
import { BaseService } from './base.service';
import { BaseUser } from './entities/base-user.entity';
interface BaseUserServiceOptions {
    useRoles: boolean;
    useAvatar: boolean;
}
export declare class BaseUserService<User extends BaseUser = BaseUser> extends BaseService<User> {
    private readonly queue;
    constructor(repository: Repository<User>, queue: Queue, options?: Partial<BaseUserServiceOptions>);
    private options;
    private readonly storageImagesService;
    private readonly roleService;
    createUser({ email, password, name }: RegisterUserDto): Promise<User>;
    findForLogin(email: string, password: string): Promise<User>;
    changePassword(data: UpdatePasswordDto): Promise<User>;
    requestEmailChange(oldEmail: string, data: ChangeEmailDto): Promise<void>;
    changeEmail(user: User, token: string): Promise<any>;
    deleteAccount({ email, password }: LoginUserDto): Promise<any>;
    changeAvatar(user: User, newAvatar: Buffer): Promise<User>;
    removeAvatar(user: User): Promise<User>;
}
export {};
