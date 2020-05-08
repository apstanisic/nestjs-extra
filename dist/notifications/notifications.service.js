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
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../base.service");
const notification_entity_1 = require("./notification.entity");
let NotificationsService = class NotificationsService extends base_service_1.BaseService {
    constructor(repository) {
        super(repository);
    }
    async addNotification({ title, body, userId }) {
        return this.create({ body, title, userId });
    }
    async deleteOldNotifications() {
        const sixMonthsBefore = moment().subtract(6, 'months').toDate();
        await this.repository.delete({ createdAt: typeorm_2.LessThan(sixMonthsBefore) });
    }
};
NotificationsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map