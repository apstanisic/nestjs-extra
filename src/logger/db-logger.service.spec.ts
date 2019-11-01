import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbLoggerService } from './db-logger.service';
import { Log } from './log.entity';

describe('DbLoggerService', () => {
  let service: DbLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbLoggerService,
        { provide: getRepositoryToken(Log, 'log_db'), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<DbLoggerService>(DbLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
