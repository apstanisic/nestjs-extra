import { ConfigService } from '@nestjs/config';
export interface CommonHandlebars {
    contactAddress?: string;
    contactEmail?: string;
    contactPhoneNumber?: string;
    firmName?: string;
    firmUrl?: string;
}
export declare function getCommonTemplateValues(configService: ConfigService): CommonHandlebars;
