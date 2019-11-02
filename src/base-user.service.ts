import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Optional,
  Inject,
} from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { BaseService } from './base.service';
import { BaseUser } from './entities/base-user.entity';
import { StorageImagesService } from './storage/storage-images.service';
import { RoleService } from './access-control/role/role.service';
import { RegisterUserDto } from './auth/auth.dto';
import { Role } from './access-control/role/roles.entity';

interface BaseUserServiceOptions {
  useRoles: boolean;
  useAvatar: boolean;
}

@Injectable()
export class BaseUserService<User extends BaseUser> extends BaseService<User> {
  constructor(
    repository: Repository<User>,
    options?: Partial<BaseUserServiceOptions>,
  ) {
    super(repository);
    if (options) {
      const { useAvatar, useRoles } = options;
      if (useAvatar !== undefined) this.options.useAvatar = useAvatar;
      if (useRoles !== undefined) this.options.useRoles = useRoles;
    }
  }

  private options: BaseUserServiceOptions = {
    useAvatar: true,
    useRoles: true,
  };

  @Inject()
  private readonly storageImagesService: StorageImagesService;

  @Inject()
  private readonly roleService: RoleService;

  /**
   * Create user and gives him basic roles.
   * @todo Delete should remove personal info for GDPR
   */
  async createUser({ email, password, name }: RegisterUserDto): Promise<User> {
    // const userExist = await this.repository.findOne({ email });
    const userExist = await this.repository.findOne({ where: { email } });
    if (userExist) throw new BadRequestException('User exists');

    try {
      const user = this.repository.create();
      user.email = email;
      user.name = name;
      user.password = password;
      user.generateSecureToken();
      const savedUser = await this.repository.save(user as DeepPartial<User>);

      if (this.options.useRoles) {
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

  /** Add avatar to user entity and to storage. Delete old avatar if exists. */
  async changeAvatar(user: User, newAvatar: Buffer): Promise<User> {
    if (!this.options.useAvatar) {
      this.logger.error('Avatar is not used.', '', 'UserModule');
      throw new InternalServerErrorException();
    }
    if (user.avatar) {
      await this.removeAvatar(user);
    }

    const name = `avatars/${user.id}`;
    const [sizes, prefix] = await this.storageImagesService.addImage(newAvatar);

    user.avatar = sizes;
    const updatedUser = await this.mutate(user, {
      user,
      reason: 'Add avatar',
      domain: user.id,
    });

    return updatedUser;
  }

  /** Remove avatar image from storage and from entity */
  async removeAvatar(user: User): Promise<User> {
    if (!this.options.useAvatar) {
      this.logger.error('Avatar is not used.', '', 'UserModule');
      throw new InternalServerErrorException();
    }
    if (!user.avatar) return user;
    await this.storageImagesService.removeImageBySizes(user.avatar);

    delete user.avatar;
    const updatedUser = await this.mutate(user, {
      user,
      reason: 'Remove avatar',
      domain: user.id,
    });

    return updatedUser;
  }
}
