import { FindConditions, ObjectLiteral, FindOperator } from 'typeorm';
export declare type OrmWhere<T = any> = FindConditions<T>[] | FindConditions<T> | ObjectLiteral | string | undefined;
export interface ParsedOrmWhere<T = any> {
    [key: string]: FindOperator<T>;
}
export declare type UUID = string;
export declare type Email = string;
export interface WithId {
    id: string;
    [key: string]: any;
}
export declare type Struct<T = any> = Record<string, T>;
export interface Image {
    id: string;
    position: number;
    sizes: ImageSizes;
    prefix: string;
}
export interface ImageSizes {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
}
