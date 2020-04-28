import { FindOperator } from 'typeorm';
import { WithId } from '../types';
export declare class ParseCursor<T extends WithId = any> {
    private cursor;
    private order;
    private table;
    query: {
        [key: string]: FindOperator<any>;
    };
    direction: 'prev' | 'next';
    private id;
    private columnName;
    private columnValue;
    constructor(cursor: string, order: 'ASC' | 'DESC', table: string);
    private toTypeOrmQuery;
    private convertValueToCorrectType;
}
