"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const validate_email_pipe_1 = require("./validate-email.pipe");
describe('Test ValidEmail pipe', () => {
    const email = 'testing@exampe.com';
    const pipe = new validate_email_pipe_1.ValidEmail();
    it('throws if value is invalid email', () => {
        expect(() => pipe.transform()).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform(undefined)).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform(null)).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform(5)).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform('string')).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform('string@')).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform('string@ofjsd')).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform({ obj: 'val' })).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform({ obj: email })).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform({ uuid: email })).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform(['key'])).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform([email])).toThrow(common_1.BadRequestException);
    });
    it('returns valid email', () => {
        expect(pipe.transform(email)).toBe(email);
    });
});
//# sourceMappingURL=validate-email.pipe.spec.js.map