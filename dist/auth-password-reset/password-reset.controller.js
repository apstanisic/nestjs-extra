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
const class_validator_1 = require("class-validator");
const base_service_1 = require("../base.service");
const consts_1 = require("../consts");
const validate_email_pipe_1 = require("../pipes/validate-email.pipe");
const password_reset_service_1 = require("./password-reset.service");
class ResetPasswordDto {
}
__decorate([
    class_validator_1.Length(8, 50),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
exports.ResetPasswordDto = ResetPasswordDto;
let PasswordResetController = class PasswordResetController {
    constructor(usersService, service) {
        this.usersService = usersService;
        this.service = service;
    }
    resetPassword(email, { password, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne({ email });
            return this.service.resetPassword({ user, token, password });
        });
    }
    sendPasswordRecoveryMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.service.sendResetPasswordEmail(email);
            return { success: true, message: 'Password reset email is sent.' };
        });
    }
};
__decorate([
    common_1.Post('reset'),
    __param(0, common_1.Param('email', validate_email_pipe_1.ValidEmail)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "resetPassword", null);
__decorate([
    common_1.Post(':email'),
    __param(0, common_1.Param('email', validate_email_pipe_1.ValidEmail)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "sendPasswordRecoveryMail", null);
PasswordResetController = __decorate([
    common_1.Controller('auth/forgot-password'),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_service_1.BaseService,
        password_reset_service_1.PasswordResetService])
], PasswordResetController);
exports.PasswordResetController = PasswordResetController;
//# sourceMappingURL=password-reset.controller.js.map