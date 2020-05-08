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
const uuid_pipe_1 = require("../pipes/uuid.pipe");
const auth_sessions_dto_1 = require("./auth-sessions.dto");
const auth_sessions_service_1 = require("./auth-sessions.service");
const moment = require("moment");
const jwt_guard_1 = require("../auth/jwt-guard");
let AuthSessionsController = class AuthSessionsController {
    constructor(service) {
        this.service = service;
    }
    async login(params, req, res) {
        const result = await this.service.attemptLogin(params.email, params.password, req.headers['user-agent']);
        res.cookie('refresh-token', result.refreshToken, {
            httpOnly: true,
            expires: moment().add(6, 'months').toDate(),
        });
        res.cookie('access-token', result.token, { httpOnly: true });
        res.send({ user: result.user, token: result.token });
    }
    async getAll(user) {
        const data = await this.service.find({ userId: user.id });
        return { data };
    }
    async revoke(id, user) {
        return this.service.deleteWhere({ id, userId: user.id });
    }
    async getNewAccessToken(req, res) {
        const isProduction = process.env.NODE_ENV === 'production';
        const userAgent = req.headers['user-agent'];
        const refreshToken = req.cookies['refresh-token'];
        if (!refreshToken)
            throw new common_1.UnauthorizedException();
        const result = await this.service.getNewAccessToken(refreshToken, { userAgent });
        res.cookie('refresh-token', result.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            expires: moment().add(6, 'months').toDate(),
        });
        res.cookie('access-token', result.token, { httpOnly: true });
        res.send({ user: result.user, token: result.token });
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_sessions_dto_1.LoginUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthSessionsController.prototype, "login", null);
__decorate([
    common_1.Get('sessions'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthSessionsController.prototype, "getAll", null);
__decorate([
    common_1.Delete('sessions/:id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    __param(0, common_1.Param('id', uuid_pipe_1.ValidUUID)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthSessionsController.prototype, "revoke", null);
__decorate([
    common_1.Post('sessions/new-token'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthSessionsController.prototype, "getNewAccessToken", null);
AuthSessionsController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [auth_sessions_service_1.AuthSessionsService])
], AuthSessionsController);
exports.AuthSessionsController = AuthSessionsController;
//# sourceMappingURL=auth-sessions.controller.js.map