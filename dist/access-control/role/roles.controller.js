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
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../../auth/get-user.decorator");
const roles_service_1 = require("./roles.service");
const uuid_pipe_1 = require("../../pipes/uuid.pipe");
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    getUsersRoles(user) {
        return this.rolesService.find({ userId: user.id });
    }
    deleteRole(id, user) {
        return this.rolesService.deleteWhere({ user, id });
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getUsersRoles", null);
__decorate([
    common_1.Delete(':roleId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('roleId', uuid_pipe_1.ValidUUID)), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "deleteRole", null);
RolesController = __decorate([
    common_1.Controller('auth/account/roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map