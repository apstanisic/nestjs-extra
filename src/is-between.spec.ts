import { validate } from 'class-validator';
import { IsBetween } from './is-between';

class MockClass {
  @IsBetween(4, 10)
  value: number;
}

describe('isBetween', () => {
  let testClass: MockClass;

  beforeEach(() => {
    testClass = new MockClass();
  });

  it('returns true when number is between (or equal)', async () => {
    testClass.value = 6;
    let erorrs = await validate(testClass);
    expect(erorrs.length).toBe(0);

    testClass.value = 4;
    erorrs = await validate(testClass);
    expect(erorrs.length).toBe(0);

    testClass.value = 10;
    erorrs = await validate(testClass);
    expect(erorrs.length).toBe(0);
  });

  it('returns false when number is not between', async () => {
    testClass.value = 2;
    let errors = await validate(testClass);
    expect(errors.length).toBe(1);

    testClass.value = 11;
    errors = await validate(testClass);
    expect(errors.length).toBe(1);
  });

  /** Sometimes value will be passed from query without checking */
  it('returns false if value is not a number', async () => {
    testClass.value = '5' as any;
    const errors = await validate(testClass);
    expect(errors.length).toBe(1);
  });
});
