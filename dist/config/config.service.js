"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const fs_1 = require("fs");
const config_module_1 = require("./config.module");
let ConfigService = class ConfigService {
    constructor(options) {
        this.logger = new common_1.Logger('ConfigModule');
        try {
            if (options.configData === undefined) {
                const file = fs_1.readFileSync('.env');
                this.configData = dotenv.parse(file);
            }
            else {
                this.configData = dotenv.parse(options.configData);
            }
        }
        catch (error) {
            this.logger.log('ConfigService was not initialized.');
        }
    }
    get data() {
        if (this.configData === undefined) {
            this.logger.error('Module does not have valid properties');
            throw new common_1.InternalServerErrorException();
        }
        return this.configData;
    }
    get(key) {
        return this.data[key];
    }
    getAll() {
        return this.data;
    }
};
ConfigService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(config_module_1.CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map