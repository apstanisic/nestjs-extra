import { WithId } from '../types';
export declare class GenerateCursor<T extends WithId = any> {
    private entity;
    private direction;
    private column;
    cursor: string;
    constructor(entity: T, direction: 'prev' | 'next', column?: string);
    private getColumnValueFromEntity;
}
