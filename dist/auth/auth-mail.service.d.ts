import { Queue } from 'bull';
export declare class AuthMailService {
    private readonly queue;
    constructor(queue: Queue);
    sendResetPasswordEmail(email: string): Promise<void>;
    sendConfirmationEmail(email: string, token: string): Promise<void>;
}
