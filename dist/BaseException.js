"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseException {
    constructor({ message = '', error = '', statusCode = 500 }) {
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
    }
}
exports.default = BaseException;
//# sourceMappingURL=BaseException.js.map