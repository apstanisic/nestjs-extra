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
const passport_1 = require("@nestjs/passport");
const auth_email_module_1 = require("../auth-email/auth-email.module");
const password_reset_module_1 = require("../auth-password-reset/password-reset.module");
const auth_sessions_module_1 = require("../auth-sessions/auth-sessions.module");
const auth_users_module_1 = require("../auth-users/auth-users.module");
const consts_1 = require("../consts");
const register_queue_1 = require("../utils/register-queue");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            bull_1.BullModule.registerQueueAsync(register_queue_1.initQueue(consts_1.QUEUE_AUTH_EMAIL)),
            auth_sessions_module_1.AuthSessionsModule,
            auth_email_module_1.AuthEmailModule,
            password_reset_module_1.AuthPasswordResetModule,
            auth_users_module_1.AuthUsersModule,
        ],
        providers: [jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;
var passport_2 = require("@nestjs/passport");
exports.AuthGuard = passport_2.AuthGuard;
//# sourceMappingURL=auth.module.js.map