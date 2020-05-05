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
const config_1 = require("@nestjs/config");
const class_transformer_1 = require("class-transformer");
const Handlebars = require("handlebars");
const path_1 = require("path");
const consts_1 = require("../consts");
const mailer_templates_helper_1 = require("../mailer/mailer-templates.helper");
const mailer_service_1 = require("../mailer/mailer.service");
const base_user_service_1 = require("../users/base-user.service");
const user_interface_1 = require("../users/user.interface");
const account_confirm_hbs_1 = require("./account-confirm.hbs");
const change_email_hbs_1 = require("./change-email.hbs");
let AuthEmailService = class AuthEmailService {
    constructor(usersService, configService, mailerService) {
        this.usersService = usersService;
        this.configService = configService;
        this.mailerService = mailerService;
        this.accountConfirmTemplate = Handlebars.compile(account_confirm_hbs_1.default);
        this.changeEmailTemplate = Handlebars.compile(change_email_hbs_1.default);
    }
    requestEmailChange(oldEmail, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findForLogin(oldEmail, data.password);
            const token = user.generateSecureToken(data.newEmail);
            yield this.usersService.mutate(user);
            const appUrl = this.configService.get(consts_1.API_URL);
            const changeEmailUrl = path_1.join(appUrl, 'auth/change-email', token);
            const commonValues = mailer_templates_helper_1.getCommonTemplateValues(this.configService);
            yield this.mailerService.sendMail({
                to: user.email,
                subject: `Promena emaila - ${commonValues.firmName}`,
                html: this.changeEmailTemplate(Object.assign(Object.assign({}, commonValues), { confirmUrl: changeEmailUrl })),
            });
        });
    }
    sendConfirmEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const appUrl = this.configService.get(consts_1.API_URL);
            const confirmUrl = path_1.join(appUrl, 'auth/confirm-account', email, token);
            const commonValues = mailer_templates_helper_1.getCommonTemplateValues(this.configService);
            yield this.mailerService.sendMail({
                to: email,
                subject: `Potvrda naloga - ${commonValues.firmName}`,
                html: this.accountConfirmTemplate(Object.assign(Object.assign({}, commonValues), { confirmUrl })),
            });
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
};
AuthEmailService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_user_service_1.BaseUserService,
        config_1.ConfigService,
        mailer_service_1.MailerService])
], AuthEmailService);
exports.AuthEmailService = AuthEmailService;
//# sourceMappingURL=auth-email.service.js.map