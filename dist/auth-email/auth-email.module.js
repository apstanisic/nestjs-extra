"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_email_controller_1 = require("./auth-email.controller");
const auth_email_service_1 = require("./auth-email.service");
let AuthEmailModule = class AuthEmailModule {
};
AuthEmailModule = __decorate([
    common_1.Module({
        controllers: [auth_email_controller_1.AuthEmailController],
        providers: [auth_email_service_1.AuthEmailService],
        exports: [auth_email_service_1.AuthEmailService],
    })
], AuthEmailModule);
exports.AuthEmailModule = AuthEmailModule;
//# sourceMappingURL=auth-email.module.js.map