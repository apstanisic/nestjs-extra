import {
  Module,
  InternalServerErrorException,
  Logger,
  Global
} from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { PasswordResetController } from "./password-reset.controller";
import { ConfigService } from "../config/config.service";
// import { UserModule } from "../../user/user.module";
import { AuthMailService } from "./auth-mail.service";
import { PasswordResetService } from "./password-reset.service";

/** Auth module depends on user module and mail module and config module */
@Global()
@Module({
  imports: [
    // UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret = configService.get("JWT_SECRET");
        if (!secret) {
          new Logger().error("JWT_SECRET NOT DEFINED");
          throw new InternalServerErrorException();
        }
        return { secret, signOptions: { expiresIn: "10 days" } };
      }
    })
  ],
  providers: [AuthService, AuthMailService, PasswordResetService, JwtStrategy],
  controllers: [AuthController, PasswordResetController]
})
export class AuthModule {}
