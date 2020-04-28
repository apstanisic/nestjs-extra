"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.GetUser = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user)
        throw new common_1.UnauthorizedException();
    return request.user;
});
//# sourceMappingURL=get-user.decorator.js.map