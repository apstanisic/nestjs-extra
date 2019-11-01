import { PipeTransform } from '@nestjs/common';
export declare class ValidReason implements PipeTransform<any, string | undefined> {
    private validator;
    transform(value?: any): string | undefined;
}
