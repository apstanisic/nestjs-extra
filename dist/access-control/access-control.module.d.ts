import { DynamicModule } from '@nestjs/common';
interface AcOptions {
    roles: string[];
    matcher: string;
    policies: string;
}
export declare class AccessControlModule {
    static forRoot(options: AcOptions): DynamicModule;
}
export {};
