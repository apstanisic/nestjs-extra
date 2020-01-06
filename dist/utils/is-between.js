"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
function checkIsBetween(value, min, max) {
    if (typeof value !== 'number')
        return false;
    if (value < min || value > max)
        return false;
    return true;
}
function IsBetween(min, max, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isBetween',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [min, max],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return checkIsBetween(value, min, max);
                },
            },
        });
    };
}
exports.IsBetween = IsBetween;
//# sourceMappingURL=is-between.js.map