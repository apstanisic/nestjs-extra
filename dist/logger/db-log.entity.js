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
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const deep_diff_1 = require("deep-diff");
const Faker = require("faker");
const common_1 = require("@nestjs/common");
const user_interface_1 = require("../entities/user.interface");
let DbLog = class DbLog {
    set newValue(value) {
        this.changes = deep_diff_1.diff(this.initialValue, value);
        this._newValue = value;
    }
    _prepare() {
        this.executedBy = class_transformer_1.plainToClass(user_interface_1.BasicUserInfo, this.executedBy);
        this.initialValue = class_transformer_1.classToClass(this.initialValue);
        if (this.initialValue && this.initialValue.id) {
            this.entityId = this.initialValue.id;
        }
        else if (this._newValue && this._newValue.id) {
            this.entityId = this._newValue.id;
        }
    }
    throwError() {
        throw new common_1.InternalServerErrorException();
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    class_transformer_1.Exclude(),
    __metadata("design:type", typeorm_1.ObjectID)
], DbLog.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column({ default: Faker.random.uuid(), type: 'string' }),
    __metadata("design:type", String)
], DbLog.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'string', default: 'update' }),
    __metadata("design:type", String)
], DbLog.prototype, "action", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DbLog.prototype, "reason", void 0);
__decorate([
    typeorm_1.Column(type => user_interface_1.BasicUserInfo),
    __metadata("design:type", Object)
], DbLog.prototype, "executedBy", void 0);
__decorate([
    typeorm_1.Column('string'),
    __metadata("design:type", String)
], DbLog.prototype, "executedById", void 0);
__decorate([
    typeorm_1.Column({ precision: 3, default: new Date() }),
    __metadata("design:type", Date)
], DbLog.prototype, "executedAt", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Object)
], DbLog.prototype, "initialValue", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], DbLog.prototype, "changes", void 0);
__decorate([
    typeorm_1.Column('string'),
    __metadata("design:type", String)
], DbLog.prototype, "entityId", void 0);
__decorate([
    typeorm_1.Column({ type: 'string', nullable: true }),
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
], DbLog.prototype, "throwError", null);
DbLog = __decorate([
    typeorm_1.Entity('logs')
], DbLog);
exports.DbLog = DbLog;
//# sourceMappingURL=db-log.entity.js.map