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
const core_1 = require("@nestjs/core");
const access_control_service_1 = require("./access-control.service");
const role_service_1 = require("./role/role.service");
let PermissionsGuard = class PermissionsGuard {
    constructor(acService, roleService, reflector = new core_1.Reflector()) {
        this.acService = acService;
        this.roleService = roleService;
        this.reflector = reflector;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessOptions = this.reflector.get('access_control', context.getHandler());
            const request = context.switchToHttp().getRequest();
            const { method } = request;
            const { user } = request.user;
            if (!user)
                throw new common_1.InternalServerErrorException();
            const defaultAction = method === 'GET' ? 'read' : 'write';
            const action = accessOptions ? accessOptions.action : defaultAction;
            const resource = accessOptions && accessOptions.resource
                ? accessOptions.resource
                : request.path;
            const roles = yield this.roleService.find({ userId: user.id });
            user.roles = roles;
            const allowed = yield this.acService.isAllowed(roles, resource, action);
            return allowed;
        });
    }
};
PermissionsGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [access_control_service_1.AccessControlService,
        role_service_1.RoleService,
        core_1.Reflector])
], PermissionsGuard);
exports.PermissionsGuard = PermissionsGuard;
//# sourceMappingURL=permissions.guard.js.map