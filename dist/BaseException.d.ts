interface Params {
    message?: string;
    statusCode?: number;
    error?: any;
}
export default class BaseException {
    statusCode: number;
    message: string;
    error: any;
    constructor({ message, error, statusCode }: Params);
}
export {};
