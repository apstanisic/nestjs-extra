"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ConfigModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
exports.CONFIG_OPTIONS = 'CONFIG_OPTIONS';
let ConfigModule = ConfigModule_1 = class ConfigModule {
    static forRoot(options) {
        return {
            module: ConfigModule_1,
            providers: [
                config_service_1.ConfigService,
                { provide: exports.CONFIG_OPTIONS, useValue: options },
            ],
            exports: [config_service_1.ConfigService],
        };
    }
};
ConfigModule = ConfigModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map