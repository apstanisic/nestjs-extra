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
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const base_user_entity_1 = require("../users/base-user.entity");
const configMock = jest.fn(() => ({ get: (key) => key }));
const validateJwtMock = jest.fn().mockReturnValue(new base_user_entity_1.BaseUser());
const authMock = jest.fn(() => ({ validateJwt: validateJwtMock }));
describe('JwtStrategy', () => {
    let jwtStrategy;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [
                { provide: config_1.ConfigService, useFactory: configMock },
                { provide: auth_service_1.AuthService, useFactory: authMock },
                jwt_strategy_1.JwtStrategy,
            ],
        }).compile();
        jwtStrategy = module.get(jwt_strategy_1.JwtStrategy);
        configMock.mockClear();
    }));
    it('returns a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield jwtStrategy.validate({ email: 'value' });
        expect(user).toBeInstanceOf(base_user_entity_1.BaseUser);
    }));
    it('throws if authService throws', () => __awaiter(void 0, void 0, void 0, function* () {
        validateJwtMock.mockReturnValue(Promise.reject());
        const res = jwtStrategy.validate({ email: 'value' });
        yield expect(res).rejects.toThrow(common_1.UnauthorizedException);
    }));
});
//# sourceMappingURL=jwt.strategy.spec.js.map