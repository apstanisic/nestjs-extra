import { FindConditions, ObjectLiteral, FindOperator } from 'typeorm';
export declare type OrmWhere<T = any> = FindConditions<T>[] | FindConditions<T> | ObjectLiteral | string | undefined;
export interface ParsedOrmWhere<T = any> {
    [key: string]: FindOperator<T>;
}
export declare type UUID = string;
export declare type Email = string;
export declare type IdType = UUID | number;
export interface WithId<T extends IdType = IdType> {
    id: T;
    [key: string]: any;
}
export declare type Struct<T = any> = Record<string, T>;
