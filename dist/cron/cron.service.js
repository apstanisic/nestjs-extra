"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cron_1 = require("cron");
let CronService = class CronService {
    constructor() {
        this.logger = new common_1.Logger('CronModule');
    }
    startJob(time, fn) {
        try {
            const job = new cron_1.CronJob(time, fn);
            job.start();
            return job;
        }
        catch (error) {
            this.logger.error('Cron error', error, 'CronModule');
            throw new common_1.InternalServerErrorException();
        }
    }
};
CronService = __decorate([
    common_1.Injectable()
], CronService);
exports.CronService = CronService;
//# sourceMappingURL=cron.service.js.map