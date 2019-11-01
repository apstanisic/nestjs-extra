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
const testing_1 = require("@nestjs/testing");
const minio_1 = require("../__mocks__/minio");
const config_service_1 = require("../config/config.service");
const storage_service_1 = require("./storage.service");
describe('StorageService', () => {
    let service;
    let mock;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                storage_service_1.StorageService,
                {
                    provide: config_service_1.ConfigService,
                    useFactory: () => {
                        return {
                            get(key) {
                                return key;
                            },
                        };
                    },
                },
            ],
        }).compile();
        service = module.get(storage_service_1.StorageService);
        minio_1.removeObject.mockClear();
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should return promise when delete file', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(minio_1.removeObject).not.toBeCalled();
        yield service.delete('someFile');
        expect(minio_1.removeObject).toBeCalled();
        expect(minio_1.removeObject).toBeCalledWith(expect.anything(), 'someFile', expect.anything());
        yield expect(service.delete('some-file-2')).rejects.toEqual('some-non-null-value');
        expect(minio_1.removeObject).toHaveBeenNthCalledWith(2, expect.anything(), 'some-file-2', expect.anything());
        yield expect(service.delete('3rd-time')).resolves.toBeUndefined();
    }));
});
//# sourceMappingURL=storage.service.spec.js.map