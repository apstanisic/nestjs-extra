import { DynamicModule } from '@nestjs/common';
export interface AcOptions {
    availableRoles: string[];
    model: string;
    policies: string;
}
export declare class AccessControlModule {
    static forRoot(options: AcOptions): DynamicModule;
}
