import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Optional,
} from '@nestjs/common';
import { Queue } from 'bull';
import { isEmail } from 'class-validator';
import { duration } from 'moment';
import { DeepPartial, Repository } from 'typeorm';
import { Role } from '../access-control/role/roles.entity';
import { RolesService } from '../access-control/role/roles.service';
import { BaseService } from '../base.service';
import { StorageImagesService } from '../storage/storage-images.service';
import { BaseUser } from './base-user.entity';
import { RegisterUserDto, UpdatePasswordDto } from '../auth-users/auth-users.dto';
import { LoginUserDto } from '../auth-sessions/auth-sessions.dto';

interface BaseUserServiceOptions {
  useRoles: boolean;
  useAvatar: boolean;
}

@Injectable()
export class BaseUserService<User extends BaseUser = BaseUser> extends BaseService<User> {
  constructor(
    repository: Repository<User>,
    private readonly queue: Queue,
    options?: Partial<BaseUserServiceOptions>,
  ) {
    super(repository);
    if (options) {
      const { useAvatar, useRoles } = options;
      if (useAvatar !== undefined) this.useAvatar = useAvatar;
      if (useRoles !== undefined) this.useRoles = useRoles;
    }
  }

  private useAvatar = true;
  private useRoles = true;

  @Optional()
  @Inject()
  private readonly storageImagesService?: StorageImagesService;

  @Optional()
  @Inject()
  private readonly roleService?: RolesService;

  /**
   * Create user and gives him basic roles.
   */
  async createUser({ email, password, name }: RegisterUserDto): Promise<User> {
    const userExist = await this.repository.findOne({ where: { email } });
    if (userExist) throw new BadRequestException('User exists');

    try {
      const user = this.repository.create();
      user.email = email;
      user.name = name;
      await user.setPassword(password);
      user.generateSecureToken();
      const savedUser = await this.repository.save(user as DeepPartial<User>);

      if (this.useRoles) {
        if (this.roleService === undefined) {
          throw new InternalServerErrorException('RoleServicenot found');
        }
        const defaultRole = new Role();
        defaultRole.domain = savedUser.id;
        defaultRole.name = 'user';
        defaultRole.userId = savedUser.id;
        await this.roleService.create(defaultRole);
      }

      return savedUser;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  /** Find user for login with provided email and password */
  async findForLogin(email: string, password: string): Promise<User> {
    const user = await this.findOne({ email });

    if (!(await user.checkPassword(password))) {
      throw new BadRequestException('Invalid parameters.');
    }
    return user;
  }

  async changePassword(data: UpdatePasswordDto): Promise<User> {
    const { email, oldPassword, newPassword } = data;

    const user = await this.findForLogin(email, oldPassword);
    await user.setPassword(newPassword);
    return this.mutate(user, {
      user,
      domain: user.id,
      reason: 'Change password.',
    });
  }

  /**
   * Change user's email in db. Check if token is valid, if email in token is same
   * and set email from token as new email
   */
  async changeEmail(user: User, token: string): Promise<any> {
    if (!user.validToken(token, duration(2, 'hour')))
      throw new BadRequestException('Invalid token');

    const [email] = token.split('___');
    if (!isEmail(email)) throw new BadRequestException('Invalid token');

    return this.update(user, { email } as any);
  }

  /** Delete account */
  async deleteAccount({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.findForLogin(email, password);
    if (user.avatar && this.storageImagesService) {
      await this.storageImagesService.removeImage(user.avatar);
    }
    return this.delete(user, { user });
  }

  /** Add avatar to user entity and to storage. Delete old avatar if exists. */
  async changeAvatar(user: User, newAvatar: Buffer): Promise<User> {
    if (this.storageImagesService === undefined) {
      throw new InternalServerErrorException('StorageService not found');
    }
    if (!this.useAvatar) {
      this.logger.error('Avatar is not used.', '', 'UserModule');
      throw new InternalServerErrorException();
    }
    if (user.avatar) {
      await this.removeAvatar(user);
    }

    // const name = `avatars/${user.id}`;
    const avatar = await this.storageImagesService.storeImage(newAvatar);
    user.avatar = avatar as any;

    const updatedUser = await this.mutate(user, {
      user,
      reason: 'Add avatar',
      domain: user.id,
    });

    return updatedUser;
  }

  /** Remove avatar image from storage and from entity */
  async removeAvatar(user: User): Promise<User> {
    if (this.storageImagesService === undefined) {
      throw new InternalServerErrorException('StorageService not found');
    }
    if (!this.useAvatar) {
      this.logger.error('Avatar is not used.', '', 'UserModule');
      throw new InternalServerErrorException();
    }
    if (!user.avatar) return user;
    await this.storageImagesService.removeImage(user.avatar);

    delete user.avatar;
    const updatedUser = await this.mutate(user, {
      user,
      reason: 'Remove avatar',
      domain: user.id,
    });

    return updatedUser;
  }
}
