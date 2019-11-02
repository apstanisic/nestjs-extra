"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config/config.service");
const consts_1 = require("./consts");
let SimpleAdminGuard = class SimpleAdminGuard {
    constructor(configService) {
        this.configService = configService;
    }
    canActivate(context) {
        const mailsString = this.configService.get(consts_1.SIMPLE_ADMIN_MAILS);
        let mails;
        if (mailsString) {
            mails = mailsString.split(';').map(mail => mail.trim());
        }
        else {
            throw new common_1.NotImplementedException();
        }
        const req = context.switchToHttp().getRequest();
        return req.user && mails.some(mail => mail === req.user.email);
    }
};
SimpleAdminGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], SimpleAdminGuard);
exports.SimpleAdminGuard = SimpleAdminGuard;
//# sourceMappingURL=simple-admin.guard.js.map