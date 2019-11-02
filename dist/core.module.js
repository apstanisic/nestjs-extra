"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const cron_module_1 = require("./cron/cron.module");
const db_module_1 = require("./db/db.module");
const db_logger_module_1 = require("./logger/db-logger.module");
const mail_module_1 = require("./mail/mail.module");
const notification_module_1 = require("./notification/notification.module");
const storage_module_1 = require("./storage/storage.module");
const access_control_module_1 = require("./access-control/access-control.module");
let CoreModule = CoreModule_1 = class CoreModule {
    static forRoot(params) {
        const modules = [];
        modules.push(config_module_1.ConfigModule.forRoot(params.config));
        modules.push(db_module_1.DbModule.forRoot(params.db));
        modules.push(mail_module_1.MailModule);
        modules.push(cron_module_1.CronModule);
        modules.push(auth_module_1.AuthModule);
        if (params.accessControl) {
            modules.push(access_control_module_1.AccessControlModule.forRoot(params.accessControl));
        }
        if (params.storage)
            modules.push(storage_module_1.StorageModule.forRoot(params.storage));
        if (params.dbLog)
            modules.push(db_logger_module_1.DbLoggerModule);
        if (params.notifications)
            modules.push(notification_module_1.NotificationModule);
        return {
            imports: modules,
            module: CoreModule_1,
        };
    }
};
CoreModule = CoreModule_1 = __decorate([
    common_1.Module({})
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map