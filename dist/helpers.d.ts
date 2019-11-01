import { Struct } from './types';
export declare function removeEmptyItems(obj: Struct): Struct;
export declare function wait(time: number): Promise<void>;
export declare function convertToObject<T = any>(query: Struct<T> | string | null | undefined): Struct;
export declare function castArray<T>(item: T | T[]): T[];
export declare function hasForbiddenKey(obj: Struct, key: string): boolean;
export declare function parseNumber(value?: any): number | undefined;
export declare function getIntFromObject(obj: any, key: string): number | undefined;
export declare function now(): Date;
