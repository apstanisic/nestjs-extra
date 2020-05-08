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
const class_transformer_1 = require("class-transformer");
const auth_email_service_1 = require("../auth-email/auth-email.service");
const consts_1 = require("../consts");
const base_user_service_1 = require("../users/base-user.service");
let AuthUsersService = class AuthUsersService {
    constructor(usersService, authEmailService) {
        this.usersService = usersService;
        this.authEmailService = authEmailService;
    }
    async registerNewUser(data) {
        const user = await this.usersService.createUser(data);
        if (!user.token)
            throw new common_1.ForbiddenException();
        await this.authEmailService.sendConfirmEmail(user.email, user.token);
        return class_transformer_1.classToClass(user);
    }
};
AuthUsersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_user_service_1.BaseUserService,
        auth_email_service_1.AuthEmailService])
], AuthUsersService);
exports.AuthUsersService = AuthUsersService;
//# sourceMappingURL=auth-users.service.js.map