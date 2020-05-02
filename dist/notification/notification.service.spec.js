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
const notification_service_1 = require("./notification.service");
describe('NotificationService', () => {
    let service;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [notification_service_1.NotificationService],
        }).compile();
        service = module.get(notification_service_1.NotificationService);
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=notification.service.spec.js.map