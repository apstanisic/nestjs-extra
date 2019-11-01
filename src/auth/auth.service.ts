import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  Inject,
  NotFoundException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { classToClass, plainToClass } from "class-transformer";
import { Validator } from "class-validator";
// import { User } from '../../user/user.entity';
// import { UsersService } from '../../user/user.service';
import { BasicUserInfo } from "../entities/user.interface";
import { SignInResponse, RegisterUserDto } from "./auth.dto";
import { JwtPayload } from "./jwt.strategy";
import { AuthMailService } from "./auth-mail.service";
import { BaseService } from "../base.service";
import { BaseUser } from "../entities/base-user.entity";
import { USER_SERVICE } from "../consts";

@Injectable()
export class AuthService {
  private validator = new Validator();

  constructor(
    // private readonly usersService: UsersService,
    @Inject(USER_SERVICE) private usersService: BaseService<BaseUser>,
    private readonly jwtService: JwtService,
    private readonly authMailService: AuthMailService
  ) {}

  /** Try to sign in user */
  async attemptLogin(email: string, password: string): Promise<SignInResponse> {
    const user = await this.findForLogin(email, password);
    const token = this.createJwt(user.email);
    return { token, user: classToClass(user) };
  }

  /** Validate token on every request. From docs */
  async validateJwt(payload: JwtPayload): Promise<BaseUser> {
    if (!payload || !this.validator.isEmail(payload.email)) {
      throw new BadRequestException();
    }
    return this.usersService.findOne(
      { email: payload.email },
      { relations: ["roles"] }
    );
  }

  /** Generate new token when user logs in */
  createJwt(email: string): string {
    return this.jwtService.sign({ email });
  }

  /** Register new user, and return him and login token */
  async registerNewUser(data: RegisterUserDto): Promise<SignInResponse> {
    const user = await this.usersService.create(data);
    const token = this.createJwt(data.email);

    if (!user.secureToken) throw new ForbiddenException();
    await this.authMailService.sendConfirmationEmail(
      user.email,
      user.secureToken
    );

    // For some reason user is not transformed without class to class
    return { token, user: classToClass(user) };
  }

  async confirmAccount(email: string, token: string): Promise<BasicUserInfo> {
    const user = await this.usersService.findOne({ email });
    if (user.secureToken !== token) throw new BadRequestException();
    user.confirmed = true;
    user.secureToken = undefined;
    user.tokenCreatedAt = undefined;
    await this.usersService.mutate(user, {
      user,
      domain: user.id,
      reason: "Confirm account."
    });
    return plainToClass(BasicUserInfo, user);
  }

  private async findForLogin(
    email: string,
    password: string
  ): Promise<BaseUser> {
    const user = await this.usersService.findOne({ email });
    if (!user) throw new NotFoundException();

    if (!(await user.checkPassword(password))) {
      throw new BadRequestException("Invalid parameters.");
    }
    return user;
  }
}
