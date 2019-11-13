import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
  /** Logger */
  private logger = new Logger(CronService.name);

  /**
   * Simple helper for cron job
   * @example
   *  this.startJob('* 1 * * *', () => console.log('It works'));
   */
  startJob(time: string | Date, fn: () => void): CronJob {
    try {
      const job = new CronJob(time, fn);
      job.start();
      return job;
    } catch (error) {
      this.logger.error('Cron error', error, 'CronModule');
      throw new InternalServerErrorException();
    }
  }
}
