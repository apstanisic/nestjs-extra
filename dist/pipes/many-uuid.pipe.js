"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ManyUUID = class ManyUUID {
    transform(value) {
        let ids;
        try {
            ids = JSON.parse(value);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
        if (!Array.isArray(ids))
            throw new common_1.BadRequestException();
        const valid = ids.every(id => class_validator_1.isUUID(id));
        if (!valid)
            throw new common_1.BadRequestException('Invalid ids');
        return ids;
    }
};
ManyUUID = __decorate([
    common_1.Injectable()
], ManyUUID);
exports.ManyUUID = ManyUUID;
//# sourceMappingURL=many-uuid.pipe.js.map