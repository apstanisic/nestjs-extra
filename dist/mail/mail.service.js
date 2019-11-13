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
const config_service_1 = require("../config/config.service");
const consts_1 = require("../consts");
let MailService = MailService_1 = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.port = 587;
        this.logger = new common_1.Logger(MailService_1.name);
        this.host = this.getConfig(consts_1.EMAIL_HOST);
        this.user = this.getConfig(consts_1.EMAIL_USER);
        this.password = this.getConfig(consts_1.EMAIL_PASSWORD);
        this.port = Number(this.configService.get(consts_1.EMAIL_PORT) || 587);
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
            secure: false,
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
    getConfig(key) {
        const value = this.configService.get(key);
        if (value === undefined) {
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