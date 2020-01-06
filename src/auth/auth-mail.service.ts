import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QUEUE_AUTH_EMAIL } from '../consts';

@Injectable()
export class AuthMailService {
  constructor(@InjectQueue(QUEUE_AUTH_EMAIL) private readonly queue: Queue) {}

  /** Send user email that enables them to reset password. */
  async sendResetPasswordEmail(email: string): Promise<void> {
    this.queue.add('reset-password', email, { attempts: 3 });
  }

  /** Send email to confirm account to user */
  async sendConfirmationEmail(email: string, token: string): Promise<void> {
    this.queue.add('confirm-account', { email, token }, { attempts: 3 });
  }
}
