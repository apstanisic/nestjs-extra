"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_1 = require("@nest-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const access_control_module_1 = require("./access-control/access-control.module");
const roles_entity_1 = require("./access-control/role/roles.entity");
const auth_module_1 = require("./auth/auth.module");
const consts_1 = require("./consts");
const db_module_1 = require("./db/db.module");
const db_log_entity_1 = require("./logger/db-log.entity");
const db_logger_module_1 = require("./logger/db-logger.module");
const notification_entity_1 = require("./notification/notification.entity");
const notification_module_1 = require("./notification/notification.module");
const storage_module_1 = require("./storage/storage.module");
let CoreModule = CoreModule_1 = class CoreModule {
    static forRoot(params) {
        const { entities } = params.db;
        if (params.notifications)
            entities.push(notification_entity_1.Notification);
        if (params.accessControl)
            entities.push(roles_entity_1.Role);
        if (params.dbLog)
            entities.push(db_log_entity_1.DbLog);
        const modules = [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [() => { var _a; return _a = params.config, (_a !== null && _a !== void 0 ? _a : {}); }],
            }),
            schedule_1.ScheduleModule.forRoot(),
            db_module_1.DbModule.forRoot(params.db),
            auth_module_1.AuthModule,
        ];
        if (params.mail)
            modules.push(mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const { get } = configService;
                    return {
                        transport: {
                            host: get(consts_1.EMAIL_HOST),
                            secure: false,
                            sender: get(consts_1.EMAIL_USER),
                            auth: { user: get(consts_1.EMAIL_USER), pass: get(consts_1.EMAIL_PASSWORD) },
                        },
                    };
                },
            }));
        if (params.storage)
            modules.push(storage_module_1.StorageModule.forRoot(params.storage));
        if (params.dbLog)
            modules.push(db_logger_module_1.DbLoggerModule);
        if (params.notifications)
            modules.push(notification_module_1.NotificationModule);
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