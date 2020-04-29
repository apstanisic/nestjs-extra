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
const class_validator_1 = require("class-validator");
class IdArrayDto {
}
__decorate([
    class_transformer_1.Transform((value) => {
        if (Array.isArray(value))
            return value;
        if (typeof value !== 'string')
            throw new common_1.BadRequestException('Ids are not valid');
        return value.split(',').filter((v) => v !== '');
    }),
    class_validator_1.IsArray(),
    class_validator_1.ArrayMaxSize(50),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsUUID('4', { each: true }),
    __metadata("design:type", Array)
], IdArrayDto.prototype, "ids", void 0);
exports.IdArrayDto = IdArrayDto;
//# sourceMappingURL=id-array.dto.js.map