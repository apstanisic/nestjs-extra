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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const deep_diff_1 = require("deep-diff");
const typeorm_1 = require("typeorm");
const user_interface_1 = require("../users/user.interface");
const base_uuid_entity_1 = require("../entities/base-uuid.entity");
let ActivityLog = class ActivityLog extends base_uuid_entity_1.UuidEntity {
    constructor(oldValue) {
        super();
        this.oldValue = oldValue;
    }
    _prepare() {
        var _a, _b;
        const user = class_transformer_1.classToPlain(this.executedBy);
        this.executedByInfo = class_transformer_1.plainToClass(user_interface_1.BasicUserInfo, user, { excludeExtraneousValues: true });
        this.executedById = this.executedBy.id;
        this.newValue = class_transformer_1.classToClass(this.newValue);
        this.delta = deep_diff_1.diff(this.oldValue, this.newValue);
        if ((_a = this.oldValue) === null || _a === void 0 ? void 0 : _a.id) {
            this.entityId = this.oldValue.id;
        }
        else if ((_b = this.newValue) === null || _b === void 0 ? void 0 : _b.id) {
            this.entityId = this.newValue.id;
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    preventUpdate() {
        throw new common_1.InternalServerErrorException('Log update forbidden');
    }
};
__decorate([
    typeorm_1.Column({ default: 'update' }),
    __metadata("design:type", String)
], ActivityLog.prototype, "action", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], ActivityLog.prototype, "entityId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ActivityLog.prototype, "reason", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ActivityLog.prototype, "collection", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json' }),
    __metadata("design:type", user_interface_1.BasicUserInfo)
], ActivityLog.prototype, "executedByInfo", void 0);
__decorate([
    typeorm_1.ManyToOne('User', { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "executedBy", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], ActivityLog.prototype, "executedById", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json' }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "newValue", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json' }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "delta", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "domainId", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ActivityLog.prototype, "_prepare", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ActivityLog.prototype, "preventUpdate", null);
ActivityLog = __decorate([
    typeorm_1.Entity('activity_logs'),
    __metadata("design:paramtypes", [Object])
], ActivityLog);
exports.ActivityLog = ActivityLog;
//# sourceMappingURL=activity-log.entity.js.map