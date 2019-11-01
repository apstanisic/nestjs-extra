"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_pipe_1 = require("./uuid.pipe");
describe('Test UUID pipe', () => {
    const uuid = '6809500c-d21a-11e9-bb65-2a2ae2dbcce4';
    const pipe = new uuid_pipe_1.ValidUUID();
    it('throws on invalid values', () => {
        expect(() => pipe.transform()).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform(undefined)).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform(null)).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform(5)).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform('string')).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform({ obj: 'val' })).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform({ obj: uuid })).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform({ uuid })).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform(['key'])).toThrow(common_1.BadRequestException);
        expect(() => pipe.transform([uuid])).toThrow(common_1.BadRequestException);
    });
    it('returns uuid on valid value', () => {
        expect(pipe.transform(uuid)).toBe(uuid);
    });
});
//# sourceMappingURL=uuid.pipe.spec.js.map