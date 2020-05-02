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
const typeorm_1 = require("@nestjs/typeorm");
const db_logger_service_1 = require("./db-logger.service");
const activity_log_entity_1 = require("./activity-log.entity");
describe('ActivityLoggerService', () => {
    let service;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                db_logger_service_1.ActivityLoggerService,
                { provide: typeorm_1.getRepositoryToken(activity_log_entity_1.ActivityLog), useValue: jest.fn() },
            ],
        }).compile();
        service = module.get(db_logger_service_1.ActivityLoggerService);
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=db-logger.service.spec.js.map