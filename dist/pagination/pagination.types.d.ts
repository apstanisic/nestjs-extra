export declare class PaginatorResponse<T = any> {
    constructor();
    pagination: {
        amount: number;
        perPage: number;
        isLastPage: boolean;
        isFirstPage?: boolean;
        next?: string;
        previous?: string;
        nextUrl?: string;
        previousUrl?: string;
    };
    data: T[];
}
export declare type PgResult<T> = Promise<PaginatorResponse<T>>;
export declare const limitField = "pg_limit";
export declare const cursorField = "pg_cursor";
export declare const orderByField = "pg_order";
