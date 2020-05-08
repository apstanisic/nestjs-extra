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
const get_user_decorator_1 = require("../auth/get-user.decorator");
const jwt_guard_1 = require("../auth/jwt-guard");
const pagination_options_1 = require("../pagination/pagination-options");
const pagination_decorator_1 = require("../pagination/pagination.decorator");
const uuid_pipe_1 = require("../pipes/uuid.pipe");
const user_interface_1 = require("../users/user.interface");
const notifications_service_1 = require("./notifications.service");
let NotificationsController = class NotificationsController {
    constructor(service) {
        this.service = service;
    }
    find(params) {
        return this.service.paginate({ ...params });
    }
    async seeNotification(id, user) {
        return this.service.updateWhere({ id, userId: user.id }, { seenAt: new Date() });
    }
    async deleteNotification(id, user) {
        return this.service.deleteWhere({ id, userId: user.id });
    }
};
__decorate([
    common_1.Get(),
    __param(0, pagination_decorator_1.GetPagination()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_options_1.PaginationParams]),
    __metadata("design:returntype", Object)
], NotificationsController.prototype, "find", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id', uuid_pipe_1.ValidUUID)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_interface_1.AuthUser]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "seeNotification", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', uuid_pipe_1.ValidUUID)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_interface_1.AuthUser]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "deleteNotification", null);
NotificationsController = __decorate([
    common_1.Controller('notifications'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map