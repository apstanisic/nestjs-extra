"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCommonTemplateValues(configService) {
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
exports.getCommonTemplateValues = getCommonTemplateValues;
//# sourceMappingURL=mailer-templates.helper.js.map