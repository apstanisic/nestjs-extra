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
var SimpleAdminGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const class_validator_1 = require("class-validator");
const consts_1 = require("./consts");
let SimpleAdminGuard = SimpleAdminGuard_1 = class SimpleAdminGuard {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(SimpleAdminGuard_1.name);
        this.validator = new class_validator_1.Validator();
    }
    canActivate(context) {
        var _a;
        const combinedMails = this.configService.get(consts_1.SIMPLE_ADMIN_MAILS);
        if (!combinedMails) {
            this.logger.error('Not implemented.');
            throw new common_1.NotImplementedException();
        }
        const mails = combinedMails
            .split(';')
            .map(mail => mail.trim())
            .filter(email => this.validator.isEmail(email));
        const req = context.switchToHttp().getRequest();
        const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        return mails.some(mail => mail === userEmail);
    }
};
SimpleAdminGuard = SimpleAdminGuard_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SimpleAdminGuard);
exports.SimpleAdminGuard = SimpleAdminGuard;
//# sourceMappingURL=simple-admin.guard.js.map