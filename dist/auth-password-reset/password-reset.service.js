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
const config_1 = require("@nestjs/config");
const Handlebars = require("handlebars");
const moment = require("moment");
const path_1 = require("path");
const auth_sessions_service_1 = require("../auth-sessions/auth-sessions.service");
const base_service_1 = require("../base.service");
const consts_1 = require("../consts");
const mailer_templates_helper_1 = require("../mailer/mailer-templates.helper");
const mailer_service_1 = require("../mailer/mailer.service");
const password_reset_hbs_1 = require("./password-reset.hbs");
let PasswordResetService = class PasswordResetService {
    constructor(usersService, authSessionsService, configService, mailerService) {
        this.usersService = usersService;
        this.authSessionsService = authSessionsService;
        this.configService = configService;
        this.mailerService = mailerService;
        this.passwordResetTemplate = Handlebars.compile(password_reset_hbs_1.template);
    }
    async sendResetPasswordEmail(email) {
        const user = await this.usersService.findOne({ email });
        const token = user.generateSecureToken();
        await this.usersService.mutate(user);
        const appUrl = this.configService.get(consts_1.APP_URL);
        const resetUrl = path_1.join(appUrl, 'auth/reset-password', email, token);
        const commonValues = mailer_templates_helper_1.getCommonTemplateValues(this.configService);
        await this.mailerService.sendMail({
            to: user.email,
            subject: `Resetovanje lozinke - ${commonValues.firmName}`,
            html: this.passwordResetTemplate({ ...commonValues, resetUrl }),
        });
    }
    async resetPassword({ user, token, password, }) {
        if (!user.validToken(token))
            throw new common_1.ForbiddenException();
        const expired = moment(user.tokenCreatedAt).add(2, 'hours').isBefore(moment());
        if (expired) {
            throw new common_1.BadRequestException('Invalid link. Link is valid for 2 hours.');
        }
        await user.setPassword(password);
        user.removeSecureToken();
        user = await this.usersService.mutate(user, {
            user,
            reason: 'Password reset',
            domain: user.id,
        });
        await this.authSessionsService.deleteWhere({ userId: user.id });
        return user;
    }
};
PasswordResetService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(consts_1.USER_SERVICE)),
    __metadata("design:paramtypes", [base_service_1.BaseService,
        auth_sessions_service_1.AuthSessionsService,
        config_1.ConfigService,
        mailer_service_1.MailerService])
], PasswordResetService);
exports.PasswordResetService = PasswordResetService;
//# sourceMappingURL=password-reset.service.js.map