"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const consts_1 = require("../consts");
exports.initQueue = (queueName) => {
    return {
        name: queueName,
        inject: [config_1.ConfigService],
        useFactory: (config) => {
            return {
                redis: { host: config.get(consts_1.REDIS_HOST), port: +config.get(consts_1.REDIS_PORT) },
            };
        },
    };
};
//# sourceMappingURL=register-queue.js.map