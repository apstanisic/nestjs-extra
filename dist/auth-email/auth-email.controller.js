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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const consts_1 = require("../consts");
const base_user_service_1 = require("../users/base-user.service");
const user_interface_1 = require("../users/user.interface");
const auth_email_dto_1 = require("./auth-email.dto");
const auth_email_service_1 = require("./auth-email.service");
let AuthEmailController = class AuthEmailController {
    constructor(service, userService) {
        this.service = service;
        this.userService = userService;
    }
    async confirmAccout(email, token) {
        return this.service.confirmAccount(email, token);
    }
    async requestEmailChange(data, user) {
        await this.service.requestEmailChange(user.email, data);
        return { message: 'success' };
    }
    async changeEmail(token, authUser) {
        const user = await this.userService.findOne(authUser.id);
        if (!user.validToken(token))
            throw new common_1.BadRequestException('Invalid token');
        const [email] = token.split('___');
        if (!class_validator_1.isEmail(email))
            throw new common_1.BadRequestException('Invalid token');
        return this.userService.update(user, { email });
    }
};
__decorate([
    common_1.Get('confirm-account/:email/:token'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Param('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthEmailController.prototype, "confirmAccout", null);
__decorate([
    common_1.Put('change-email'),
    __param(0, common_1.Body()), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_email_dto_1.ChangeEmailDto, user_interface_1.AuthUser]),
    __metadata("design:returntype", Promise)
], AuthEmailController.prototype, "requestEmailChange", null);
__decorate([
    common_1.Get('change-email/:token'),
    __param(0, common_1.Param('token')), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_interface_1.AuthUser]),
    __metadata("design:returntype", Promise)
], AuthEmailController.prototype, "changeEmail", null);
AuthEmailController = __decorate([
    common_1.Controller(),
    __param(1, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [auth_email_service_1.AuthEmailService,
        base_user_service_1.BaseUserService])
], AuthEmailController);
exports.AuthEmailController = AuthEmailController;
//# sourceMappingURL=auth-email.controller.js.map