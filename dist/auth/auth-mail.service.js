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
const Handlebars = require("handlebars");
const config_service_1 = require("../config/config.service");
const consts_1 = require("../consts");
const mail_service_1 = require("../mail/mail.service");
const account_confirm_handlebars_1 = require("./templates/account-confirm.handlebars");
const password_reset_handlebars_1 = require("./templates/password-reset.handlebars");
const base_user_service_1 = require("../base-user.service");
let AuthMailService = class AuthMailService {
    constructor(usersService, mailService, configService) {
        this.usersService = usersService;
        this.mailService = mailService;
        this.configService = configService;
        this.templates = {};
        this.logger = new common_1.Logger();
        this.storeTemplatesInMemory();
    }
    sendResetPasswordEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.usersService.findOne({ email });
                const token = user.generateSecureToken();
                yield this.usersService.mutate(user);
                const appUrl = this.configService.get('APP_URL');
                const resetUrl = `${appUrl}/auth/reset-password/${email}/${token}`;
                if (!this.templates.passwordReset) {
                    throw new common_1.InternalServerErrorException();
                }
                const commonValues = this.getCommonTemplateValues();
                const template = this.templates.passwordReset({
                    resetUrl,
                });
                yield this.mailService.send({
                    to: user.email,
                    subject: `Resetovanje lozinke - ${commonValues.firmName}`,
                    html: template,
                });
            }
            catch (error) { }
        });
    }
    sendConfirmationEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const appUrl = this.configService.get('API_URL');
            const confirmUrl = `${appUrl}/auth/confirm-account/${email}/${token}`;
            const commonValues = this.getCommonTemplateValues();
            if (!this.templates.accountConfirm)
                throw new common_1.InternalServerErrorException();
            const template = this.templates.accountConfirm(Object.assign(Object.assign({}, commonValues), { confirmUrl }));
            yield this.mailService.send({
                to: email,
                subject: `Potvrda naloga - ${commonValues.firmName}`,
                html: template,
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
    storeTemplatesInMemory() {
        this.templates.accountConfirm = Handlebars.compile(account_confirm_handlebars_1.accountConfirmTemplate);
        this.templates.passwordReset = Handlebars.compile(password_reset_handlebars_1.passwordResetTemplate);
    }
};
AuthMailService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_user_service_1.BaseUserService,
        mail_service_1.MailService,
        config_service_1.ConfigService])
], AuthMailService);
exports.AuthMailService = AuthMailService;
//# sourceMappingURL=auth-mail.service.js.map