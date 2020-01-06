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
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const faker_1 = require("faker");
const typeorm_1 = require("typeorm");
const moment = require("moment");
const base_entity_1 = require("../entities/base.entity");
const image_entity_1 = require("../entities/image.entity");
let BaseUser = class BaseUser extends base_entity_1.BaseEntity {
    setPassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newPassword.length > 50)
                throw new common_1.BadRequestException('Password is to long');
            this.password = yield bcrypt.hash(newPassword, 12);
        });
    }
    checkPassword(enteredPassword) {
        return bcrypt.compare(enteredPassword, this.password);
    }
    generateSecureToken(prepend = '') {
        this.secureToken = `${prepend}___${faker_1.random.uuid()}`;
        this.tokenCreatedAt = new Date();
        return this.secureToken;
    }
    removeSecureToken() {
        this.secureToken = undefined;
        this.tokenCreatedAt = undefined;
    }
    validToken(token, duration = moment.duration(1, 'year')) {
        if (!this.secureToken)
            return false;
        if (!this.tokenCreatedAt)
            return false;
        if (this.secureToken !== token)
            return false;
        const expired = moment(this.createdAt)
            .add(duration)
            .isBefore(moment());
        if (expired)
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
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], BaseUser.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.Length(2, 100),
    __metadata("design:type", String)
], BaseUser.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'jsonb' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", image_entity_1.Image)
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
__decorate([
    class_transformer_1.Exclude(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseUser.prototype, "setPassword", null);
BaseUser = __decorate([
    typeorm_1.Unique(['email'])
], BaseUser);
exports.BaseUser = BaseUser;
//# sourceMappingURL=base-user.entity.js.map