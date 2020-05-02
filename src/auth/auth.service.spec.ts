import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthMailService } from './auth-mail.service';
import { BaseUser } from '../users/base-user.entity';

const testUser = new BaseUser();
testUser.email = 'testemail@email.com';

const jwtMock = jest.fn(() => ({ sign: (value: any): string => value }));
const mailMock = jest.fn().mockResolvedValue(testUser);
const findMock = jest.fn().mockResolvedValue(testUser);
const findOneMock = jest.fn().mockResolvedValue(testUser);
const userMock = jest.fn(() => ({
  findForLogin: findMock,
  findOne: findOneMock,
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: 'USER_SERVICE', useFactory: userMock },
        { provide: JwtService, useFactory: jwtMock },
        { provide: AuthMailService, useFactory: mailMock },
        AuthService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userMock.mockClear();
  });

  describe('createJwt', () => {
    it('creates passed value to jwt.sign', () => {
      expect(authService.createJwt('test')).toEqual({ email: 'test' });
      expect(authService.createJwt('any-value')).toEqual({
        email: 'any-value',
      });
    });
  });

  describe('validateJwt', () => {
    it('validates jwt', async () => {
      await expect(authService.validateJwt({ email: 'valid@email.com' })).resolves.toBeInstanceOf(
        BaseUser,
      );
    });

    it('throws on invalid values', async () => {
      await expect(authService.validateJwt(undefined as any)).rejects.toThrow(BadRequestException);
      await expect(authService.validateJwt({ email: 'bad-email' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('passes findOne error', async () => {
      findOneMock.mockRejectedValue(new NotFoundException());
      await expect(authService.validateJwt({ email: 'test@email.com' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('attemptLogin', () => {
    it('returns user jwt token', async () => {
      const token = await authService.createJwt(testUser.email);

      await expect(authService.attemptLogin(testUser.email, 'password')).resolves.toEqual({
        user: testUser,
        token,
      });
    });
  });
});
