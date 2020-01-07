"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const consts_1 = require("../consts");
const register_queue_1 = require("../utils/register-queue");
const notification_controller_1 = require("./notification.controller");
const notification_entity_1 = require("./notification.entity");
const notification_service_1 = require("./notification.service");
const notifications_cron_service_1 = require("./notifications.cron.service");
const notifications_processor_1 = require("./notifications.processor");
let NotificationsModule = NotificationsModule_1 = class NotificationsModule {
    static forRoot(useMq = false) {
        const imports = [typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification])];
        const providers = [notification_service_1.NotificationService];
        if (useMq) {
            imports.push(bull_1.BullModule.registerQueueAsync(register_queue_1.initQueue(consts_1.QUEUE_NOTIFICATIONS)));
            providers.push(notifications_processor_1.NotificationsProcessor);
        }
        else {
            providers.push(notifications_cron_service_1.NotificationsCronService);
        }
        return {
            imports,
            providers,
            module: NotificationsModule_1,
            controllers: [notification_controller_1.NotificationController],
            exports: [notification_service_1.NotificationService],
        };
    }
};
NotificationsModule = NotificationsModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], NotificationsModule);
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notification.module.js.map