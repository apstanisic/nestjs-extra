"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notifications_controller_1 = require("./notifications.controller");
const notification_entity_1 = require("./notification.entity");
const notifications_service_1 = require("./notifications.service");
const notifications_cron_1 = require("./notifications.cron");
let NotificationsModule = NotificationsModule_1 = class NotificationsModule {
    static forRoot() {
        return {
            module: NotificationsModule_1,
            imports: [typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification])],
            providers: [notifications_service_1.NotificationsService, notifications_cron_1.NotificationsCron],
            controllers: [notifications_controller_1.NotificationsController],
            exports: [notifications_service_1.NotificationsService],
        };
    }
};
NotificationsModule = NotificationsModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], NotificationsModule);
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map