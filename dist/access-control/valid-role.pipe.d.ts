import { PipeTransform } from '@nestjs/common';
export declare class ValidRole implements PipeTransform<string, string> {
    private roles;
    constructor(roles: string[]);
    private validator;
    transform(value: string): string;
}
