import { PipeTransform } from '@nestjs/common';
export declare class ValidEmail implements PipeTransform<string, string> {
    transform(value?: any): string;
}
