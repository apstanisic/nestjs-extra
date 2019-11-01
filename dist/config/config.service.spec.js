"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
jest.mock('fs');
describe('ConfigService', () => {
    let service;
    const returnValue = { EXAMPLE: '1', TEST: 'string-test' };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.readFileSync.mockClear();
        const module = yield testing_1.Test.createTestingModule({
            providers: [config_service_1.ConfigService],
        }).compile();
        service = module.get(config_service_1.ConfigService);
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should call readFileSync', () => {
        expect(fs_1.readFileSync).toBeCalledTimes(1);
    });
    it('returns proper value from get', () => {
        expect(service.get('EXAMPLE')).toBe('1');
        expect(service.get('TEST')).toBe('string-test');
    });
    it('returns all values', () => {
        expect(service.getAll()).toEqual(returnValue);
    });
    it('throws on invalid file', () => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.readFileSync.mockImplementation(() => {
            throw new Error();
        });
        global.console.error = jest.fn();
        yield expect(testing_1.Test.createTestingModule({
            providers: [config_service_1.ConfigService],
        }).compile()).rejects.toThrow(common_1.InternalServerErrorException);
        expect(fs_1.readFileSync).toBeCalledTimes(2);
    }));
});
//# sourceMappingURL=config.service.spec.js.map