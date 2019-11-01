"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AccessControlModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const permissions_guard_1 = require("./permissions.guard");
const access_control_service_1 = require("./access-control.service");
const consts_1 = require("../consts");
const role_module_1 = require("../role/role.module");
let AccessControlModule = AccessControlModule_1 = class AccessControlModule {
    static forRoot(options) {
        return {
            module: AccessControlModule_1,
            imports: [role_module_1.RoleModule],
            providers: [
                { provide: consts_1.AC_ROLES_LIST, useValue: options.roles },
                { provide: consts_1.AC_MODEL, useValue: options.matcher },
                { provide: consts_1.AC_POLICIES, useValue: options.policies },
                access_control_service_1.AccessControlService,
                permissions_guard_1.PermissionsGuard,
            ],
            exports: [access_control_service_1.AccessControlService, permissions_guard_1.PermissionsGuard],
        };
    }
};
AccessControlModule = AccessControlModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], AccessControlModule);
exports.AccessControlModule = AccessControlModule;
//# sourceMappingURL=access-control.module.js.map