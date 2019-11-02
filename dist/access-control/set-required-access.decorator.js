"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
function SetRequiredAccess(options) {
    return common_1.SetMetadata('access_control', options);
}
exports.SetRequiredAccess = SetRequiredAccess;
//# sourceMappingURL=set-required-access.decorator.js.map