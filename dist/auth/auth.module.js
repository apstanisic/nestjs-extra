"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_strategy_1 = require("./jwt.strategy");
const password_reset_controller_1 = require("./password-reset.controller");
const config_service_1 = require("../config/config.service");
const auth_mail_service_1 = require("./auth-mail.service");
const password_reset_service_1 = require("./password-reset.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_service_1.ConfigService],
                useFactory: (configService) => {
                    const secret = configService.get('JWT_SECRET');
                    if (!secret) {
                        new common_1.Logger().error('JWT_SECRET NOT DEFINED');
                        throw new common_1.InternalServerErrorException();
                    }
                    return { secret, signOptions: { expiresIn: '10 days' } };
                },
            }),
        ],
        providers: [auth_service_1.AuthService, auth_mail_service_1.AuthMailService, password_reset_service_1.PasswordResetService, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController, password_reset_controller_1.PasswordResetController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map