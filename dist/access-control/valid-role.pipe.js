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
const class_validator_1 = require("class-validator");
const consts_1 = require("../consts");
let ValidRole = class ValidRole {
    constructor(roles) {
        this.roles = roles;
        this.validator = new class_validator_1.Validator();
    }
    transform(value) {
        if (!this.validator.isString(value) ||
            !this.validator.isIn(value, this.roles)) {
            throw new common_1.BadRequestException('Role does not exist');
        }
        return value;
    }
};
ValidRole = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(consts_1.AC_ROLES_LIST)),
    __metadata("design:paramtypes", [Array])
], ValidRole);
exports.ValidRole = ValidRole;
//# sourceMappingURL=valid-role.pipe.js.map