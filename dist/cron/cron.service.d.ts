import { CronJob } from 'cron';
export declare class CronService {
    private logger;
    startJob(time: string | Date, fn: () => void): CronJob;
}
