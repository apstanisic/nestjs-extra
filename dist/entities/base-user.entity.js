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
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const faker_1 = require("faker");
const base_entity_1 = require("./base.entity");
let BaseUser = class BaseUser extends base_entity_1.BaseEntity {
    set password(newPassword) {
        if (newPassword.length > 50) {
            throw new common_1.BadRequestException('Password is to long');
        }
        this._password = bcrypt.hashSync(newPassword);
    }
    checkPassword(enteredPassword) {
        return bcrypt.compare(enteredPassword, this._password);
    }
    generateSecureToken() {
        this.secureToken = faker_1.random.uuid();
        this.tokenCreatedAt = new Date();
        return this.secureToken;
    }
    removeSecureToken() {
        this.secureToken = undefined;
        this.tokenCreatedAt = undefined;
    }
    validToken(token) {
        if (!this.secureToken)
            return false;
        if (!this.tokenCreatedAt)
            return false;
        if (this.secureToken !== token)
            return false;
        return true;
    }
};
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], BaseUser.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ name: 'password' }),
    class_validator_1.IsString(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], BaseUser.prototype, "_password", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.Length(2, 100),
    __metadata("design:type", String)
], BaseUser.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'simple-json' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], BaseUser.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Boolean)
], BaseUser.prototype, "confirmed", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], BaseUser.prototype, "secureToken", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, precision: 3 }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Date)
], BaseUser.prototype, "tokenCreatedAt", void 0);
BaseUser = __decorate([
    typeorm_1.Unique(['email'])
], BaseUser);
exports.BaseUser = BaseUser;
//# sourceMappingURL=base-user.entity.js.map