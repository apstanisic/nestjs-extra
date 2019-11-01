import { UUID } from '../types';
export declare class Notification {
    id: string;
    title: string;
    body?: string;
    userId: UUID;
    seenAt?: Date;
    createdAt: Date;
}
