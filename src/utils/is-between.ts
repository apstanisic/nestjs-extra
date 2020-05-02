import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/** Helper function to keep decorator only as decorator wrapper. */
function checkIsBetween(value: any, min: number, max: number): boolean {
  if (typeof value !== 'number') return false;
  if (value < min || value > max) return false;
  return true;
}

/* eslint-disable */

/**
 * Check if value is between 2 numbers
 * Eslint is desabled because this is example from docs, and we
 * Want to keep it as close as posible as original
 * @Todo there is a problem here. I don't know why
 * @deprecated Not working correctly
 */
export function IsBetween(min: number, max: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBetween',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min, max],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          /* This is relavant part */
          return checkIsBetween(value, min, max);
        },
      },
    });
  };
}
