"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
describe('Helpers', () => {
    it('removes empty items from object', () => {
        const obj = {
            a: 'Hello World',
            b: null,
            c: undefined,
            d: '',
            e: 5,
            f: {},
        };
        expect(helpers_1.removeEmptyItems(obj)).toEqual({ a: 'Hello World', e: 5, f: {} });
    });
    it('waits spacified time', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.useFakeTimers();
        const spy = jest.fn();
        helpers_1.wait(50).then(spy);
        jest.advanceTimersByTime(49);
        yield Promise.resolve();
        expect(spy).not.toHaveBeenCalled();
        jest.advanceTimersByTime(1);
        yield Promise.resolve();
        expect(spy).toHaveBeenCalled();
    }));
    it('converts any to object', () => {
        expect(helpers_1.convertToObject(null)).toEqual({});
        expect(helpers_1.convertToObject(undefined)).toEqual({});
        expect(helpers_1.convertToObject('fdsa9')).toEqual({});
        expect(helpers_1.convertToObject('[1,2,3,4]')).toEqual({});
        expect(helpers_1.convertToObject('{"a":5}')).toEqual({ a: 5 });
        expect(helpers_1.convertToObject({ a: 5 })).toEqual({ a: 5 });
        expect(helpers_1.convertToObject(5)).toEqual({});
    });
    it('casts value to array', () => {
        expect(helpers_1.castArray(1)).toEqual([1]);
        expect(helpers_1.castArray('str')).toEqual(['str']);
        expect(helpers_1.castArray({ prop: 2 })).toEqual([{ prop: 2 }]);
        expect(helpers_1.castArray([1, 2])).toEqual([1, 2]);
    });
    it('disallows forbidden key', () => {
        const key = 'key';
        expect(helpers_1.hasForbiddenKey({ some: 'value' }, key)).toEqual(false);
        expect(helpers_1.hasForbiddenKey({ some: key }, key)).toEqual(false);
        expect(helpers_1.hasForbiddenKey({ some: { key } }, key)).toEqual(false);
        expect(helpers_1.hasForbiddenKey({ [key]: 'value' }, key)).toEqual(true);
        expect(helpers_1.hasForbiddenKey({ [`${key}_ext`]: 123 }, key)).toEqual(true);
        expect(helpers_1.hasForbiddenKey({ [`pre_${key}`]: 123 }, key)).toEqual(true);
    });
    it('returns correct number ', () => {
        expect(helpers_1.parseNumber('1.444')).toBe(1);
        expect(helpers_1.parseNumber(1)).toBe(1);
        expect(helpers_1.parseNumber(1.8)).toBe(1);
    });
    it('returns undefined for incorect value in parseNumber', () => {
        expect(helpers_1.parseNumber()).toBeUndefined();
        expect(helpers_1.parseNumber({ number: 1 })).toBeUndefined();
        expect(helpers_1.parseNumber('fsda')).toBeUndefined();
    });
});
//# sourceMappingURL=helpers.spec.js.map