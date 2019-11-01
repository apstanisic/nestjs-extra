import { readFileSync } from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from './config.service';

jest.mock('fs');

// Disable logging for testing

describe('ConfigService', () => {
  let service: ConfigService;
  const returnValue = { EXAMPLE: '1', TEST: 'string-test' };

  beforeAll(async () => {
    (readFileSync as jest.Mock).mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call readFileSync', () => {
    expect(readFileSync).toBeCalledTimes(1);
  });

  it('returns proper value from get', () => {
    expect(service.get('EXAMPLE')).toBe('1');
    expect(service.get('TEST')).toBe('string-test');
  });

  it('returns all values', () => {
    expect(service.getAll()).toEqual(returnValue);
  });

  it('throws on invalid file', async () => {
    (readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    global.console.error = jest.fn();

    await expect(
      Test.createTestingModule({
        providers: [ConfigService],
      }).compile(),
    ).rejects.toThrow(InternalServerErrorException);

    // Once in before each, once above
    expect(readFileSync).toBeCalledTimes(2);
  });
});
