import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { BaseUser } from '../users/base-user.entity';

// import { User } from '../../user/user.entity';

const configMock = jest.fn(() => ({ get: (key: any): string => key }));
const validateJwtMock = jest.fn().mockReturnValue(new BaseUser());
const authMock = jest.fn(() => ({ validateJwt: validateJwtMock }));

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: ConfigService, useFactory: configMock },
        { provide: AuthService, useFactory: authMock },
        JwtStrategy,
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configMock.mockClear();
  });

  it('returns a user', async () => {
    const user = await jwtStrategy.validate({ email: 'value' });
    expect(user).toBeInstanceOf(BaseUser);
  });

  it('throws if authService throws', async () => {
    validateJwtMock.mockReturnValue(Promise.reject());
    const res = jwtStrategy.validate({ email: 'value' });
    await expect(res).rejects.toThrow(UnauthorizedException);
  });
});
