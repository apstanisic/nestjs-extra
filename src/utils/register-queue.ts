import { BullModuleAsyncOptions, BullModuleOptions } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { REDIS_HOST, REDIS_PORT } from '../consts';

/** Initialize queue. Removes boilerplate */
export const initQueue = (queueName: string): BullModuleAsyncOptions => {
  return {
    name: queueName,
    inject: [ConfigService],
    useFactory: (config: ConfigService): BullModuleOptions => {
      return {
        redis: { host: config.get(REDIS_HOST), port: +config.get(REDIS_PORT) },
      };
    },
  };
};
