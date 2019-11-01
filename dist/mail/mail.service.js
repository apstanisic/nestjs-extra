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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const class_validator_1 = require("class-validator");
const config_service_1 = require("../config/config.service");
let MailService = MailService_1 = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.user = 'toby.leffler@ethereal.email';
        this.password = 'tXC6AxGXHYWBmXrtyq';
        this.senderName = 'Toby Leffler';
        this.host = 'smtp.ethereal.email';
        this.port = 587;
        this.secure = false;
        this.logger = new common_1.Logger(MailService_1.name);
        this.validator = new class_validator_1.Validator();
        if (configService.get('NODE_ENV') === 'production') {
            const host = this.valueOrThrowIfEmpty(this.configService.get('EMAIL_HOST'));
            this.host = host;
            const port = Number(this.valueOrThrowIfEmpty(this.configService.get('EMAIL_PORT')));
            this.port = port;
            const user = this.valueOrThrowIfEmpty(this.configService.get('EMAIL_USER'));
            this.user = user;
            const password = this.valueOrThrowIfEmpty(this.configService.get('EMAIL_PASSWORD'));
            this.password = password;
            this.secure = Boolean(this.configService.get('EMAIL_SECURE')) || false;
        }
        this.createTransport();
    }
    send(data) {
        try {
            return this.transporter.sendMail(data);
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Problem sending email.');
        }
    }
    createTransport() {
        this.transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure,
            auth: {
                user: this.user,
                pass: this.password,
            },
        }, { sender: this.user });
        this.transporter
            .verify()
            .then(() => this.logger.log('MailService is working correctly.'))
            .catch(e => this.logger.error('Mail is not working', e));
    }
    valueOrThrowIfEmpty(value) {
        const { isEmpty } = this.validator;
        if (isEmpty(value)) {
            throw new common_1.InternalServerErrorException('Mail config invalid.');
        }
        return value;
    }
};
MailService = MailService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map