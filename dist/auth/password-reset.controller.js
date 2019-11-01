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
const validate_email_pipe_1 = require("../validate-email.pipe");
const auth_mail_service_1 = require("./auth-mail.service");
const auth_dto_1 = require("./auth.dto");
const password_reset_service_1 = require("./password-reset.service");
const base_service_1 = require("../base.service");
let PasswordResetController = class PasswordResetController {
    constructor(authMailService, passwordResetService, usersService) {
        this.authMailService = authMailService;
        this.passwordResetService = passwordResetService;
        this.usersService = usersService;
    }
    sendPasswordRecoveryMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authMailService.sendResetPasswordEmail(email);
            return { message: 'Password reset email is sent. ' };
        });
    }
    resetPassword(email, { password, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne({ email });
            return this.passwordResetService.resetPassword(user, token, password);
        });
    }
};
__decorate([
    common_1.Post('forgot-password/:email'),
    __param(0, common_1.Param('email', validate_email_pipe_1.ValidEmail)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "sendPasswordRecoveryMail", null);
__decorate([
    common_1.Post('reset-password/:email/:token'),
    __param(0, common_1.Param('email', validate_email_pipe_1.ValidEmail)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], PasswordResetController.prototype, "resetPassword", null);
PasswordResetController = __decorate([
    common_1.Controller('auth'),
    __param(2, common_1.Inject('USER_SERVICE')),
    __metadata("design:paramtypes", [auth_mail_service_1.AuthMailService,
        password_reset_service_1.PasswordResetService,
        base_service_1.BaseService])
], PasswordResetController);
exports.PasswordResetController = PasswordResetController;
//# sourceMappingURL=password-reset.controller.js.map