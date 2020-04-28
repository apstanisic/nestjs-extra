import { PipeTransform } from '@nestjs/common';
export declare class ValidUUID implements PipeTransform<string, string> {
    transform(value?: any): string;
}
