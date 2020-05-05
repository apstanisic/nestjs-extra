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
const base_uuid_entity_1 = require("../entities/base-uuid.entity");
const moment = require("moment");
let AuthSession = class AuthSession extends base_uuid_entity_1.UuidEntity {
};
__decorate([
    typeorm_1.ManyToOne('User', { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], AuthSession.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index(),
    __metadata("design:type", Object)
], AuthSession.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], AuthSession.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AuthSession.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AuthSession.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], AuthSession.prototype, "ip", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], AuthSession.prototype, "browser", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], AuthSession.prototype, "os", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], AuthSession.prototype, "lastUsed", void 0);
__decorate([
    typeorm_1.Column({ default: moment().add(6, 'months').toDate() }),
    __metadata("design:type", Date)
], AuthSession.prototype, "validUntil", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], AuthSession.prototype, "valid", void 0);
AuthSession = __decorate([
    typeorm_1.Entity('auth_sessions')
], AuthSession);
exports.AuthSession = AuthSession;
//# sourceMappingURL=auth-session.entity.js.map