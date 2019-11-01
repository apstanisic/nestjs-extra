import { DynamicModule } from '@nestjs/common';
export interface AcOptions {
    roles: string[];
    matcher: string;
    policies: string;
}
export declare class AccessControlModule {
    static forRoot(options: AcOptions): DynamicModule;
}
