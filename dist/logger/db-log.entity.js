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
const base_entity_1 = require("../entities/base.entity");
const user_interface_1 = require("../users/user.interface");
let DbLog = class DbLog extends base_entity_1.BaseEntity {
    set newValue(value) {
        this.changes = deep_diff_1.diff(this.oldValue, value);
        this._newValue = value;
    }
    _prepare() {
        var _a, _b, _c;
        const user = class_transformer_1.classToPlain(this.executedBy);
        this.executedByInfo = class_transformer_1.plainToClass(user_interface_1.BasicUserInfo, user, {
            excludeExtraneousValues: true,
        });
        this.executedById = this.executedBy.id;
        this.oldValue = (_a = class_transformer_1.classToClass(this.oldValue), (_a !== null && _a !== void 0 ? _a : {}));
        if ((_b = this.oldValue) === null || _b === void 0 ? void 0 : _b.id) {
            this.entityId = this.oldValue.id;
        }
        else if ((_c = this._newValue) === null || _c === void 0 ? void 0 : _c.id) {
            this.entityId = this._newValue.id;
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    preventUpdate() {
        throw new common_1.InternalServerErrorException();
    }
};
__decorate([
    typeorm_1.Column({ default: 'update' }),
    __metadata("design:type", String)
], DbLog.prototype, "action", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DbLog.prototype, "reason", void 0);
__decorate([
    typeorm_1.Column({ type: 'jsonb' }),
    __metadata("design:type", user_interface_1.BasicUserInfo)
], DbLog.prototype, "executedByInfo", void 0);
__decorate([
    typeorm_1.ManyToOne('User', { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", Object)
], DbLog.prototype, "executedBy", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], DbLog.prototype, "executedById", void 0);
__decorate([
    typeorm_1.Column({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], DbLog.prototype, "oldValue", void 0);
__decorate([
    typeorm_1.Column({ type: 'jsonb' }),
    __metadata("design:type", Object)
], DbLog.prototype, "changes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], DbLog.prototype, "entityId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DbLog.prototype, "domainId", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DbLog.prototype, "_prepare", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DbLog.prototype, "preventUpdate", null);
DbLog = __decorate([
    typeorm_1.Entity('logs')
], DbLog);
exports.DbLog = DbLog;
//# sourceMappingURL=db-log.entity.js.map