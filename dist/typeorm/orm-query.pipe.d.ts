import { PipeTransform } from '@nestjs/common';
import { ParsedOrmWhere } from '../types';
export declare class OrmQueryPipe<T = any> implements PipeTransform {
    transform(value: any): ParsedOrmWhere<T>;
}
