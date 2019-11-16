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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const base_user_service_1 = require("../base-user.service");
const consts_1 = require("../consts");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const get_user_decorator_1 = require("./get-user.decorator");
const valid_jpeg_image_1 = require("../storage/valid-jpeg-image");
const role_service_1 = require("../access-control/role/role.service");
let AuthController = class AuthController {
    constructor(userService, authService, roleService) {
        this.userService = userService;
        this.authService = authService;
        this.roleService = roleService;
    }
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.attemptLogin(params.email, params.password);
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.registerNewUser(data);
        });
    }
    changePassword(data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.email !== data.email)
                throw new common_1.ForbiddenException();
            return this.userService.changePassword(data);
        });
    }
    deleteUser(loggedUser, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (loggedUser.email !== data.email)
                throw new common_1.ForbiddenException();
            return this.userService.deleteAccount(data);
        });
    }
    getUsersRoles(user) {
        console.log(user);
        console.log(this.roleService !== undefined);
        if (!this.roleService) {
            throw new common_1.NotFoundException();
        }
        return this.roleService.find({ userId: user.id });
    }
    confirmAccout(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.confirmAccount(email, token);
        });
    }
    removeProfilePicture(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.removeAvatar(user);
        });
    }
    addProfilePicture(file, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.changeAvatar(user, file);
        });
    }
    getAccount(user) {
        return user;
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Put('password'),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.UpdatePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete('account'),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
__decorate([
    common_1.Get('account/roles'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUsersRoles", null);
__decorate([
    common_1.Get('confirm-account/:email/:token'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Param('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmAccout", null);
__decorate([
    common_1.Delete('avatar'),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "removeProfilePicture", null);
__decorate([
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', valid_jpeg_image_1.validJpeg(0.5))),
    common_1.Put('avatar'),
    __param(0, common_1.UploadedFile()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "addProfilePicture", null);
__decorate([
    common_1.Get('account'),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getAccount", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __param(2, common_1.Optional()), __param(2, common_1.Inject()),
    __metadata("design:paramtypes", [base_user_service_1.BaseUserService,
        auth_service_1.AuthService,
        role_service_1.RoleService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map