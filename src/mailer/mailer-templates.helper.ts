import { ConfigService } from '@nestjs/config';

export interface CommonHandlebars {
  contactAddress?: string;
  contactEmail?: string;
  contactPhoneNumber?: string;
  firmName?: string;
  firmUrl?: string;
}

/** Get common values from config to be used in templates.
 * @param configService DI of NestJs's ConfigService
 */
export function getCommonTemplateValues(configService: ConfigService): CommonHandlebars {
  const contactAddress = configService.get('FIRM_ADDRESS');
  const contactEmail = configService.get('FIRM_CONTACT_EMAIL');
  const contactPhoneNumber = configService.get('FIRM_PHONE_NUMBER');
  const firmUrl = configService.get('FIRM_URL');
  const firmName = configService.get('FIRM_NAME');

  return {
    contactAddress,
    contactEmail,
    contactPhoneNumber,
    firmName,
    firmUrl,
  };
}
