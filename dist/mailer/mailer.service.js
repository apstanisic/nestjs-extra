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
var MailerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer_1 = require("nodemailer");
const consts_1 = require("../consts");
let MailerService = MailerService_1 = class MailerService {
    constructor(configService) {
        var _a;
        this.configService = configService;
        this.logger = new common_1.Logger(MailerService_1.name);
        this.transporter = nodemailer_1.createTransport({
            host: configService.get(consts_1.EMAIL_HOST),
            port: +((_a = this.configService.get(consts_1.EMAIL_PORT)) !== null && _a !== void 0 ? _a : '587'),
            secure: false,
            auth: {
                user: configService.get(consts_1.EMAIL_USER),
                pass: configService.get(consts_1.EMAIL_PASSWORD),
            },
        }, { sender: configService.get(consts_1.EMAIL_USER) });
        this.transporter
            .verify()
            .then(() => this.logger.log('MailService is working correctly.'))
            .catch(e => this.logger.error('Mail is not working', e));
    }
    sendMail(data) {
        try {
            return this.transporter.sendMail(data);
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Problem sending email.');
        }
    }
};
MailerService = MailerService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map