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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../base.service");
const consts_1 = require("../consts");
const notification_entity_1 = require("./notification.entity");
let NotificationService = class NotificationService extends base_service_1.BaseService {
    constructor(repository, queue) {
        super(repository);
        if (queue) {
            queue.add('delete-old', null, { repeat: { cron: '0 */12 * * *' } });
        }
    }
    deleteMany(criteria) {
        return this.repository.delete(criteria);
    }
    addNotification({ title, body, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.create({ body, title, userId });
        });
    }
    deleteOldNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            const sixMonthsBefore = moment()
                .subtract(6, 'months')
                .toDate();
            yield this.deleteMany({
                createdAt: typeorm_2.LessThan(sixMonthsBefore),
            });
        });
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(notification_entity_1.Notification)),
    __param(1, common_1.Optional()), __param(1, bull_1.InjectQueue(consts_1.QUEUE_NOTIFICATIONS)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map