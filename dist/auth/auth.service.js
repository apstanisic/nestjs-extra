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
const jwt_1 = require("@nestjs/jwt");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_service_1 = require("../base.service");
const consts_1 = require("../consts");
const user_interface_1 = require("../entities/user.interface");
const auth_mail_service_1 = require("./auth-mail.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, authMailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.authMailService = authMailService;
        this.validator = new class_validator_1.Validator();
    }
    attemptLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findForLogin(email, password);
            const token = this.createJwt(user.email);
            return { token, user: class_transformer_1.classToClass(user) };
        });
    }
    validateJwt(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload || !this.validator.isEmail(payload.email)) {
                throw new common_1.BadRequestException();
            }
            const { email } = payload;
            return this.usersService.findOne({ email });
        });
    }
    createJwt(email) {
        return this.jwtService.sign({ email });
    }
    registerNewUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.create(data);
            const token = this.createJwt(data.email);
            if (!user.secureToken)
                throw new common_1.ForbiddenException();
            yield this.authMailService.sendConfirmationEmail(user.email, user.secureToken);
            return { token, user: class_transformer_1.classToClass(user) };
        });
    }
    confirmAccount(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne({ email });
            if (!user.validToken(token))
                throw new common_1.BadRequestException();
            user.confirmed = true;
            user.removeSecureToken();
            yield this.usersService.mutate(user, {
                user,
                domain: user.id,
                reason: 'Email address confirmed.',
            });
            return class_transformer_1.plainToClass(user_interface_1.BasicUserInfo, user);
        });
    }
    findForLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne({ email });
            const validPassword = yield user.checkPassword(password);
            if (!validPassword) {
                throw new common_1.BadRequestException('Invalid parameters.');
            }
            return user;
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_service_1.BaseService,
        jwt_1.JwtService,
        auth_mail_service_1.AuthMailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map