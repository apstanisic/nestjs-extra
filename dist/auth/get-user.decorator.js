"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.GetUser = common_1.createParamDecorator((data, req) => {
    console.log('usao');
    return req.user;
});
//# sourceMappingURL=get-user.decorator.js.map