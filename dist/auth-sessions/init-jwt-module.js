"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const consts_1 = require("../consts");
const common_1 = require("@nestjs/common");
function initJwtModule() {
    return jwt_1.JwtModule.registerAsync({
        inject: [config_1.ConfigService],
        useFactory: (configService) => {
            const secret = configService.get(consts_1.JWT_SECRET);
            if (!secret) {
                new common_1.Logger(jwt_1.JwtModule.name).error('JWT_SECRET not defined');
                throw new common_1.InternalServerErrorException();
            }
            return { secret, signOptions: { expiresIn: 180 } };
        },
    });
}
exports.initJwtModule = initJwtModule;
//# sourceMappingURL=init-jwt-module.js.map