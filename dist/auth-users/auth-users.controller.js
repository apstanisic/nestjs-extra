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
const consts_1 = require("../consts");
const base_user_service_1 = require("../users/base-user.service");
const class_transformer_1 = require("class-transformer");
const user_interface_1 = require("../users/user.interface");
const auth_users_dto_1 = require("./auth-users.dto");
const auth_users_service_1 = require("./auth-users.service");
const jwt_guard_1 = require("../auth/jwt-guard");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let AuthUsersController = class AuthUsersController {
    constructor(userService, authUsersService) {
        this.userService = userService;
        this.authUsersService = authUsersService;
    }
    async register(data) {
        return this.authUsersService.registerNewUser(data);
    }
    async changePassword(data, user) {
        if (user.email !== data.email)
            throw new common_1.ForbiddenException();
        return this.userService.changePassword(data);
    }
    async deleteUser(user, data) {
        return this.userService.deleteAccount({ email: user.email, password: data.password });
    }
    async getAccount(user) {
        const fetchedUser = await this.userService.findOne(user.id);
        return class_transformer_1.classToClass(fetchedUser);
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_users_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthUsersController.prototype, "register", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Put('account/password'),
    __param(0, common_1.Body()), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_users_dto_1.UpdatePasswordDto, user_interface_1.AuthUser]),
    __metadata("design:returntype", Promise)
], AuthUsersController.prototype, "changePassword", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    common_1.Delete('account'),
    __param(0, get_user_decorator_1.GetUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_interface_1.AuthUser, auth_users_dto_1.OnlyPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthUsersController.prototype, "deleteUser", null);
__decorate([
    common_1.Get('account'),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_interface_1.AuthUser]),
    __metadata("design:returntype", Promise)
], AuthUsersController.prototype, "getAccount", null);
AuthUsersController = __decorate([
    common_1.Controller(),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_user_service_1.BaseUserService,
        auth_users_service_1.AuthUsersService])
], AuthUsersController);
exports.AuthUsersController = AuthUsersController;
//# sourceMappingURL=auth-users.controller.js.map