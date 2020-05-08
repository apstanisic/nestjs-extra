"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const access_control_module_1 = require("./access-control/access-control.module");
const roles_entity_1 = require("./access-control/role/roles.entity");
const auth_module_1 = require("./auth/auth.module");
const db_module_1 = require("./db/db.module");
const activity_log_entity_1 = require("./logger/activity-log.entity");
const db_logger_module_1 = require("./logger/db-logger.module");
const mailer_module_1 = require("./mailer/mailer.module");
const notification_entity_1 = require("./notification/notification.entity");
const notification_module_1 = require("./notification/notification.module");
const storage_module_1 = require("./storage/storage.module");
const register_queue_1 = require("./utils/register-queue");
let CoreModule = CoreModule_1 = class CoreModule {
    static forRoot(params) {
        const { entities } = params.db;
        if (params.notifications)
            entities.push(notification_entity_1.Notification);
        if (params.accessControl)
            entities.push(roles_entity_1.Role);
        if (params.dbLog)
            entities.push(activity_log_entity_1.ActivityLog);
        const modules = [
            config_1.ConfigModule.forRoot({ ...params.config, isGlobal: true }),
            bull_1.BullModule.registerQueueAsync(register_queue_1.initQueue('app')),
            schedule_1.ScheduleModule.forRoot(),
            db_module_1.DbModule.forRoot(params.db),
            auth_module_1.AuthModule,
            mailer_module_1.MailerModule,
        ];
        if (params.storage !== false)
            modules.push(storage_module_1.StorageModule.forRoot(params.storage));
        if (params.dbLog)
            modules.push(db_logger_module_1.ActivityLoggerModule);
        if (params.useMail)
            modules.push(mailer_module_1.MailerModule);
        if (params.notifications)
            modules.push(notification_module_1.NotificationsModule.forRoot(params.useMq));
        if (params.accessControl) {
            modules.push(access_control_module_1.AccessControlModule.forRoot(params.accessControl));
        }
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