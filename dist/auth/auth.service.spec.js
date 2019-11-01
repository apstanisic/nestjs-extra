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
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_mail_service_1 = require("./auth-mail.service");
const base_user_entity_1 = require("../entities/base-user.entity");
const testUser = new base_user_entity_1.BaseUser();
testUser.email = 'testemail@email.com';
const jwtMock = jest.fn(() => ({ sign: (value) => value }));
const mailMock = jest.fn().mockResolvedValue(testUser);
const findMock = jest.fn().mockResolvedValue(testUser);
const findOneMock = jest.fn().mockResolvedValue(testUser);
const userMock = jest.fn(() => ({
    findForLogin: findMock,
    findOne: findOneMock,
}));
describe('AuthService', () => {
    let authService;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                { provide: 'USER_SERVICE', useFactory: userMock },
                { provide: jwt_1.JwtService, useFactory: jwtMock },
                { provide: auth_mail_service_1.AuthMailService, useFactory: mailMock },
                auth_service_1.AuthService,
            ],
        }).compile();
        authService = module.get(auth_service_1.AuthService);
        userMock.mockClear();
    }));
    describe('createJwt', () => {
        it('creates passed value to jwt.sign', () => {
            expect(authService.createJwt('test')).toEqual({ email: 'test' });
            expect(authService.createJwt('any-value')).toEqual({
                email: 'any-value',
            });
        });
    });
    describe('validateJwt', () => {
        it('validates jwt', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(authService.validateJwt({ email: 'valid@email.com' })).resolves.toBeInstanceOf(base_user_entity_1.BaseUser);
        }));
        it('throws on invalid values', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(authService.validateJwt(undefined)).rejects.toThrow(common_1.BadRequestException);
            yield expect(authService.validateJwt({ email: 'bad-email' })).rejects.toThrow(common_1.BadRequestException);
        }));
        it('passes findOne error', () => __awaiter(void 0, void 0, void 0, function* () {
            findOneMock.mockRejectedValue(new common_1.NotFoundException());
            yield expect(authService.validateJwt({ email: 'test@email.com' })).rejects.toThrow(common_1.NotFoundException);
        }));
    });
    describe('attemptLogin', () => {
        it('returns user jwt token', () => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield authService.createJwt(testUser.email);
            yield expect(authService.attemptLogin(testUser.email, 'password')).resolves.toEqual({ user: testUser, token });
        }));
    });
});
//# sourceMappingURL=auth.service.spec.js.map