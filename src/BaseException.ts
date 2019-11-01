interface Params {
  message?: string;
  statusCode?: number;
  error?: any;
}

export default class BaseException {
  statusCode: number;
  message: string;
  error: any;

  constructor({ message = '', error = '', statusCode = 500 }: Params) {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }
}
