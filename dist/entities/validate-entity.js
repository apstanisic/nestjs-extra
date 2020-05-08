"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
async function validateEntity(entity) {
    let errors = await class_validator_1.validate(entity);
    if (errors.length > 0) {
        errors = errors.map(({ target, ...other }) => ({ ...other, target: class_transformer_1.classToClass(target) }));
        throw new common_1.BadRequestException(errors);
    }
}
exports.validateEntity = validateEntity;
//# sourceMappingURL=validate-entity.js.map