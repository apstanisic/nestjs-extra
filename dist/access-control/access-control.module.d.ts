import { DynamicModule } from '@nestjs/common';
export interface AccessControlOptions {
    availableRoles: string[];
    model: string;
    policies: string;
}
export declare class AccessControlModule {
    static forRoot(options: AccessControlOptions): DynamicModule;
}
