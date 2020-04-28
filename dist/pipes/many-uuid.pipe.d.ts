import { PipeTransform } from '@nestjs/common';
import { UUID } from '../types';
export declare class ManyUUID implements PipeTransform<string, UUID[]> {
    transform(value: any): UUID[];
}
