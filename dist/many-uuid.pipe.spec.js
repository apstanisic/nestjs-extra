"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Faker = require("faker");
const class_validator_1 = require("class-validator");
const many_uuid_pipe_1 = require("./many-uuid.pipe");
describe('Many UUID pipe', () => {
    const pipe = new many_uuid_pipe_1.ManyUUID();
    const uuid = Faker.random.uuid();
    const validator = new class_validator_1.Validator();
    it('transforms values to uuids', () => {
        expect(pipe.transform(`["${uuid}"]`).length).toBe(1);
        expect(pipe.transform(`["${uuid}", "${uuid}"]`).length).toBe(2);
        const ids = pipe.transform(`["${uuid}", "${uuid}"]`);
        expect(ids.every(id => validator.isUUID(id))).toBe(true);
    });
    it('throws on invalid values', () => {
        expect(() => pipe.transform(undefined)).toThrow();
        expect(() => pipe.transform('vlaue')).toThrow();
        expect(() => pipe.transform(512)).toThrow();
        expect(() => pipe.transform({ hello: 'world' })).toThrow();
        expect(() => pipe.transform([1, 2, 3])).toThrow();
        expect(() => pipe.transform(`[1,2,3,4]`)).toThrow();
        expect(() => pipe.transform(`[51, "${uuid}"]`).length).toThrow();
    });
});
//# sourceMappingURL=many-uuid.pipe.spec.js.map