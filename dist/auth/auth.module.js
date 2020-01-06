"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const consts_1 = require("../consts");
const register_queue_1 = require("../register-queue");
const auth_mail_service_1 = require("./auth-mail.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const password_reset_controller_1 = require("./password-reset.controller");
const password_reset_service_1 = require("./password-reset.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const secret = configService.get(consts_1.JWT_SECRET);
                    if (!secret) {
                        new common_1.Logger(jwt_1.JwtModule.name).error('JWT_SECRET not defined');
                        throw new common_1.InternalServerErrorException();
                    }
                    return { secret, signOptions: { expiresIn: '10 days' } };
                },
            }),
            bull_1.BullModule.registerQueueAsync(Object.assign({}, register_queue_1.initQueue(consts_1.QUEUE_AUTH_EMAIL))),
        ],
        providers: [jwt_strategy_1.JwtStrategy, auth_service_1.AuthService, auth_mail_service_1.AuthMailService, password_reset_service_1.PasswordResetService],
        controllers: [auth_controller_1.AuthController, password_reset_controller_1.PasswordResetController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
var passport_2 = require("@nestjs/passport");
exports.AuthGuard = passport_2.AuthGuard;
//# sourceMappingURL=auth.module.js.map