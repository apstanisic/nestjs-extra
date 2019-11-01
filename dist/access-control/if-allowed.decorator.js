"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
function IfAllowed(action = 'write', resourcePath) {
    return common_1.SetMetadata('access_control', [true, action, resourcePath]);
}
exports.IfAllowed = IfAllowed;
//# sourceMappingURL=if-allowed.decorator.js.map