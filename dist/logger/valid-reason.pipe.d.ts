import { PipeTransform } from '@nestjs/common';
export declare class ValidReason implements PipeTransform<any, string | undefined> {
    transform(value?: any): string | undefined;
}
