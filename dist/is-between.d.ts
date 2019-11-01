import { ValidationOptions } from 'class-validator';
export declare function IsBetween(min: number, max: number, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
