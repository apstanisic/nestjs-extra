import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLoggerService } from './db-logger.service';
import { ActivityLog } from './activity-log.entity';

describe('ActivityLoggerService', () => {
  let service: ActivityLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityLoggerService,
        { provide: getRepositoryToken(ActivityLog), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<ActivityLoggerService>(ActivityLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
