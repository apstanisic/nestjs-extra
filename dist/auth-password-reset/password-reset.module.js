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
const consts_1 = require("../consts");
const register_queue_1 = require("../utils/register-queue");
const password_reset_controller_1 = require("./password-reset.controller");
const password_reset_service_1 = require("./password-reset.service");
let AuthPasswordResetModule = class AuthPasswordResetModule {
};
AuthPasswordResetModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [bull_1.BullModule.registerQueueAsync(register_queue_1.initQueue(consts_1.QUEUE_RESET_PASSWORD))],
        providers: [password_reset_service_1.PasswordResetService],
        controllers: [password_reset_controller_1.PasswordResetController],
    })
], AuthPasswordResetModule);
exports.AuthPasswordResetModule = AuthPasswordResetModule;
//# sourceMappingURL=password-reset.module.js.map