import { PipeTransform } from '@nestjs/common';
import { FindOperator } from 'typeorm';
import { OrmWhere, Struct } from '../types';
export declare type OrmQuery<T = any, U = FindOperator<T>> = Struct<U>;
export declare class OrmQueryPipe implements PipeTransform {
    transform(value: any): OrmWhere;
}
