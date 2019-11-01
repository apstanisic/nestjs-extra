import { Test } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ConfigService } from '../config/config.service';

const configMock = jest.fn(() => ({ get: (value: any): any => value }));

describe('MailService', () => {
  let mailService: MailService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: ConfigService, useFactory: configMock },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  it('not implemented', () => {
    expect(1).toBe(1);
  });
});
