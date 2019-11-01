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
const base_user_entity_1 = require("./base-user.entity");
const roles_entity_1 = require("../access-control/role/roles.entity");
class BaseUserWithRoles extends base_user_entity_1.BaseUser {
}
__decorate([
    typeorm_1.OneToMany(type => roles_entity_1.Role, role => role.userId),
    class_transformer_1.Exclude(),
    __metadata("design:type", Array)
], BaseUserWithRoles.prototype, "roles", void 0);
exports.BaseUserWithRoles = BaseUserWithRoles;
//# sourceMappingURL=base-user-with-roles.entity.js.map