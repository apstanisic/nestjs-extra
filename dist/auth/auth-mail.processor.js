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
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Handlebars = require("handlebars");
const path_1 = require("path");
const base_user_service_1 = require("../users/base-user.service");
const consts_1 = require("../consts");
const mailer_service_1 = require("../mailer/mailer.service");
const account_confirm_hbs_1 = require("./templates/account-confirm.hbs");
const password_reset_hbs_1 = require("./templates/password-reset.hbs");
let AuthMailProcessor = class AuthMailProcessor {
    constructor(usersService, configService, mailerService) {
        this.usersService = usersService;
        this.configService = configService;
        this.mailerService = mailerService;
        this.accountConfirmTemplate = Handlebars.compile(account_confirm_hbs_1.default);
        this.passwordResetTemplate = Handlebars.compile(password_reset_hbs_1.default);
    }
    resetPasswordMails(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = job.data;
            const user = yield this.usersService.findOne({ email });
            const token = user.generateSecureToken();
            yield this.usersService.mutate(user);
            const appUrl = this.configService.get(consts_1.APP_URL);
            const resetUrl = path_1.join(appUrl, 'auth/reset-password', email, token);
            const commonValues = this.getCommonTemplateValues();
            yield this.mailerService.sendMail({
                to: user.email,
                subject: `Resetovanje lozinke - ${commonValues.firmName}`,
                html: this.passwordResetTemplate(Object.assign(Object.assign({}, commonValues), { resetUrl })),
            });
        });
    }
    confirmAccountEmail(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, token } = job.data;
            const appUrl = this.configService.get(consts_1.API_URL);
            const confirmUrl = path_1.join(appUrl, 'auth/confirm-account', email, token);
            const commonValues = this.getCommonTemplateValues();
            yield this.mailerService.sendMail({
                to: email,
                subject: `Potvrda naloga - ${commonValues.firmName}`,
                html: this.accountConfirmTemplate(Object.assign(Object.assign({}, commonValues), { confirmUrl })),
            });
        });
    }
    changeEmail(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, token } = job.data;
            const appUrl = this.configService.get(consts_1.API_URL);
            const changeEmailUrl = path_1.join(appUrl, 'auth/change-email', token);
            const commonValues = this.getCommonTemplateValues();
            yield this.mailerService.sendMail({
                to: email,
                subject: `Promena emaila - ${commonValues.firmName}`,
                html: this.changeEmailTemplate(Object.assign(Object.assign({}, commonValues), { confirmUrl: changeEmailUrl })),
            });
        });
    }
    getCommonTemplateValues() {
        const contactAddress = this.configService.get('FIRM_ADDRESS');
        const contactEmail = this.configService.get('FIRM_CONTACT_EMAIL');
        const contactPhoneNumber = this.configService.get('FIRM_PHONE_NUMBER');
        const firmUrl = this.configService.get('FIRM_URL');
        const firmName = this.configService.get('FIRM_NAME');
        return {
            contactAddress,
            contactEmail,
            contactPhoneNumber,
            firmName,
            firmUrl,
        };
    }
};
__decorate([
    bull_1.Process('reset-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthMailProcessor.prototype, "resetPasswordMails", null);
__decorate([
    bull_1.Process('confirm-account'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthMailProcessor.prototype, "confirmAccountEmail", null);
__decorate([
    bull_1.Process('change-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthMailProcessor.prototype, "changeEmail", null);
AuthMailProcessor = __decorate([
    bull_1.Processor(consts_1.QUEUE_AUTH_EMAIL),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_user_service_1.BaseUserService,
        config_1.ConfigService,
        mailer_service_1.MailerService])
], AuthMailProcessor);
exports.AuthMailProcessor = AuthMailProcessor;
//# sourceMappingURL=auth-mail.processor.js.map