import { PipeTransform } from '@nestjs/common';
export declare class ValidUUID implements PipeTransform<string, string> {
    private validator;
    transform(value?: any): string;
}
