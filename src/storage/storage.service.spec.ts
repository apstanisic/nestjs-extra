import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { removeObject } from '../__mocks__/minio';
import { StorageService } from './storage.service';

// jest.mock('minio');
describe('StorageService', () => {
  let service: StorageService;
  let mock: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        {
          provide: ConfigService,
          useFactory: (): any => {
            return {
              get(key: string): string {
                return key;
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<StorageService>(StorageService);
    removeObject.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return promise when delete file', async () => {
    // expect(1).toBe(1);
    expect(removeObject).not.toBeCalled();
    await service.delete('someFile');
    expect(removeObject).toBeCalled();
    expect(removeObject).toBeCalledWith(
      expect.anything(),
      'someFile',
      expect.anything(),
    );
    await expect(service.delete('some-file-2')).rejects.toEqual(
      'some-non-null-value',
    );
    expect(removeObject).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      'some-file-2',
      expect.anything(),
    );
    await expect(service.delete('3rd-time')).resolves.toBeUndefined();
  });
});
