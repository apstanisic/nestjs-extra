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
const mail_service_1 = require("./mail.service");
const config_service_1 = require("../config/config.service");
const configMock = jest.fn(() => ({ get: (value) => value }));
describe('MailService', () => {
    let mailService;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                mail_service_1.MailService,
                { provide: config_service_1.ConfigService, useFactory: configMock },
            ],
        }).compile();
        mailService = module.get(mail_service_1.MailService);
    }));
    it('not implemented', () => {
        expect(1).toBe(1);
    });
});
//# sourceMappingURL=mail.service.spec.js.map