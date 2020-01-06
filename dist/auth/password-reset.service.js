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
const moment = require("moment");
const base_service_1 = require("../base.service");
const consts_1 = require("../consts");
let PasswordResetService = class PasswordResetService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    resetPassword(user, token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.validToken(token))
                throw new common_1.ForbiddenException();
            const expired = moment(user.tokenCreatedAt)
                .add(2, 'hours')
                .isBefore(moment());
            if (expired) {
                throw new common_1.BadRequestException('Invalid link. Link is valid for 2 hours.');
            }
            yield user.setPassword(password);
            user.removeSecureToken();
            user = yield this.usersService.mutate(user, {
                user,
                reason: 'Password reset',
                domain: user.id,
            });
            return user;
        });
    }
};
PasswordResetService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_service_1.BaseService])
], PasswordResetService);
exports.PasswordResetService = PasswordResetService;
//# sourceMappingURL=password-reset.service.js.map