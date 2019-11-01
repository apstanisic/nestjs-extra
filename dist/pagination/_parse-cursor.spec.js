"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Faker = require("faker");
const typeorm_1 = require("typeorm");
const _parse_cursor_1 = require("./_parse-cursor");
const _generate_cursor_1 = require("./_generate-cursor");
describe('Check if ParseCursor parses correctly', () => {
    const uuid = Faker.random.uuid();
    it('Should generate proper TypeOrm raw query', () => {
        const generated = new _generate_cursor_1.GenerateCursor({ id: uuid, createdAt: new Date() }, 'next', 'createdAt').cursor;
        const parsed = new _parse_cursor_1.ParseCursor(generated, 'ASC');
        expect(parsed.query).toHaveProperty('createdAt');
        expect(parsed.query).not.toHaveProperty('id');
        expect(parsed.query.createdAt).toBeInstanceOf(typeorm_1.FindOperator);
    });
    it('Should throw on invalid params', () => {
        const now = new Date();
        expect(() => new _parse_cursor_1.ParseCursor('f29j9823jf232rj8j9')).toThrow();
        const withInvalidId = `invalid-uuid;createdAt;${now.getTime()}`;
        expect(() => new _parse_cursor_1.ParseCursor(withInvalidId)).toThrow();
        const withoutValue = `${uuid};someColumn`;
        expect(() => new _parse_cursor_1.ParseCursor(withoutValue)).toThrow();
    });
});
//# sourceMappingURL=_parse-cursor.spec.js.map