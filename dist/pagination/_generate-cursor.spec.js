"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Faker = require("faker");
const class_validator_1 = require("class-validator");
const _generate_cursor_1 = require("./_generate-cursor");
describe('Propertly generating pagination cursor', () => {
    const uuid = Faker.random.uuid();
    const validator = new class_validator_1.Validator();
    it('Should generate valid base64 cursor', () => {
        const entity = {
            id: uuid,
            createdAt: new Date(),
        };
        const generator = new _generate_cursor_1.GenerateCursor(entity, 'next', 'createdAt');
        expect(validator.isBase64(generator.cursor)).toBe(true);
        const parsed = Buffer.from(generator.cursor, 'base64').toString('ascii');
        const splited = parsed.split(';');
        expect(splited).toHaveLength(3);
        expect(splited[0]).toBe(entity.id);
        expect(splited[1]).toBe('createdAt');
        expect(Number(splited[2])).toBe(entity.createdAt.getTime());
    });
    it('Should throw if Id not provided', () => {
        const entity = {
            createdAt: new Date(),
            uuid: Faker.random.uuid(),
        };
        expect(() => new _generate_cursor_1.GenerateCursor(entity, 'next', 'createdAt')).toThrow();
        expect(() => new _generate_cursor_1.GenerateCursor({ id: undefined }, 'next')).toThrow();
    });
    it('Should throw if column not provided', () => {
        const entity = { id: Faker.random.uuid() };
        expect(() => {
            const generator = new _generate_cursor_1.GenerateCursor(entity, 'next', 'createdAt');
        }).toThrow();
    });
    it('Should use string without trying to convert to date', () => {
        const { cursor } = new _generate_cursor_1.GenerateCursor({ id: uuid, price: 41 }, 'next', 'price');
        expect(validator.isBase64(cursor)).toBe(true);
    });
    it('Should should throw if value undefined', () => {
        expect(() => new _generate_cursor_1.GenerateCursor({ id: uuid, price: undefined }, 'next', 'price')).toThrow();
    });
});
//# sourceMappingURL=_generate-cursor.spec.js.map