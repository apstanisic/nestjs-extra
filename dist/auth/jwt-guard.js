"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("@nestjs/passport");
class JwtGuard extends passport_1.AuthGuard('jwt') {
}
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=jwt-guard.js.map