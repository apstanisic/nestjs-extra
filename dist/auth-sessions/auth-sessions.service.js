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
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const Faker = require("faker");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../base.service");
const consts_1 = require("../consts");
const base_user_service_1 = require("../users/base-user.service");
const auth_session_entity_1 = require("./auth-session.entity");
const moment = require("moment");
let AuthSessionsService = class AuthSessionsService extends base_service_1.BaseService {
    constructor(repository, usersService, jwtService) {
        super(repository);
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    attemptLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne({ email });
            const validPassword = yield user.checkPassword(password);
            if (!validPassword)
                throw new common_1.BadRequestException('Invalid parameters.');
            const session = new auth_session_entity_1.AuthSession();
            session.email = user.email;
            session.userId = user.id;
            session.validUntil = moment().add(1, 'year').toDate();
            session.refreshToken = Faker.random.uuid();
            const savedSession = yield this.create(session);
            const accessToken = this.jwtService.sign({ email: user.email, name: user.name, id: user.id });
            return {
                token: accessToken,
                user: class_transformer_1.classToClass(user),
                refreshToken: savedSession.refreshToken,
            };
        });
    }
    getNewAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.findOne({ refreshToken, valid: true });
            const user = yield this.usersService.findOne(session.userId);
            const { email, name, id } = user;
            const accessToken = this.jwtService.sign({ email, name, id });
            return { token: accessToken, user: class_transformer_1.classToClass(user), refreshToken };
        });
    }
};
AuthSessionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(auth_session_entity_1.AuthSession)),
    __param(1, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        base_user_service_1.BaseUserService,
        jwt_1.JwtService])
], AuthSessionsService);
exports.AuthSessionsService = AuthSessionsService;
//# sourceMappingURL=auth-sessions.service.js.map