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
let ValidReason = class ValidReason {
    constructor() {
        this.validator = new class_validator_1.Validator();
    }
    transform(value) {
        if (!this.validator.length(value, 3, 250)) {
            throw new common_1.BadRequestException('Must have between 3 and 250 chars.');
        }
        return value;
    }
};
ValidReason = __decorate([
    common_1.Injectable()
], ValidReason);
exports.ValidReason = ValidReason;
//# sourceMappingURL=valid-reason.pipe.js.map