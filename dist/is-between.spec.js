"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const class_validator_1 = require("class-validator");
const is_between_1 = require("./is-between");
class MockClass {
}
__decorate([
    is_between_1.IsBetween(4, 10),
    __metadata("design:type", Number)
], MockClass.prototype, "value", void 0);
describe('isBetween', () => {
    let testClass;
    beforeEach(() => {
        testClass = new MockClass();
    });
    it('returns true when number is between (or equal)', () => __awaiter(void 0, void 0, void 0, function* () {
        testClass.value = 6;
        let erorrs = yield class_validator_1.validate(testClass);
        expect(erorrs.length).toBe(0);
        testClass.value = 4;
        erorrs = yield class_validator_1.validate(testClass);
        expect(erorrs.length).toBe(0);
        testClass.value = 10;
        erorrs = yield class_validator_1.validate(testClass);
        expect(erorrs.length).toBe(0);
    }));
    it('returns false when number is not between', () => __awaiter(void 0, void 0, void 0, function* () {
        testClass.value = 2;
        let errors = yield class_validator_1.validate(testClass);
        expect(errors.length).toBe(1);
        testClass.value = 11;
        errors = yield class_validator_1.validate(testClass);
        expect(errors.length).toBe(1);
    }));
    it('returns false if value is not a number', () => __awaiter(void 0, void 0, void 0, function* () {
        testClass.value = '5';
        const errors = yield class_validator_1.validate(testClass);
        expect(errors.length).toBe(1);
    }));
});
//# sourceMappingURL=is-between.spec.js.map