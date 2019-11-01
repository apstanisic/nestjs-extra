import { ParsedOrmWhere, Struct } from '../types';
export declare function parseQuery<T = any>(query: Struct | string | null | undefined): ParsedOrmWhere<T>;
