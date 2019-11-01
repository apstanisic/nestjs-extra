import { PipeTransform } from '@nestjs/common';
export declare class ValidEmail implements PipeTransform<string, string> {
    private validator;
    transform(value?: any): string;
}
