"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_session_entity_1 = require("./auth-session.entity");
const auth_sessions_controller_1 = require("./auth-sessions.controller");
const auth_sessions_service_1 = require("./auth-sessions.service");
const init_jwt_module_1 = require("./init-jwt-module");
let AuthSessionsModule = class AuthSessionsModule {
};
AuthSessionsModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([auth_session_entity_1.AuthSession]), init_jwt_module_1.initJwtModule()],
        providers: [auth_sessions_service_1.AuthSessionsService],
        controllers: [auth_sessions_controller_1.AuthSessionsController],
        exports: [auth_sessions_service_1.AuthSessionsService],
    })
], AuthSessionsModule);
exports.AuthSessionsModule = AuthSessionsModule;
//# sourceMappingURL=auth-sessions.module.js.map