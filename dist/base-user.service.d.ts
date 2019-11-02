/// <reference types="node" />
import { Repository } from 'typeorm';
import { BaseService } from './base.service';
import { BaseUser } from './entities/base-user.entity';
import { RegisterUserDto } from './auth/auth.dto';
interface BaseUserServiceOptions {
    useRoles: boolean;
    useAvatar: boolean;
}
export declare class BaseUserService<User extends BaseUser = BaseUser> extends BaseService<User> {
    constructor(repository: Repository<User>, options?: Partial<BaseUserServiceOptions>);
    private options;
    private readonly storageImagesService;
    private readonly roleService;
    createUser({ email, password, name }: RegisterUserDto): Promise<User>;
    findForLogin(email: string, password: string): Promise<User>;
    changeAvatar(user: User, newAvatar: Buffer): Promise<User>;
    removeAvatar(user: User): Promise<User>;
}
export {};
