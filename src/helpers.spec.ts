import {
  removeEmptyItems,
  convertToObject,
  castArray,
  hasForbiddenKey,
  wait,
  parseNumber,
} from './helpers';

// For testing wait

describe('Helpers', () => {
  // removeEmptyItems
  it('removes empty items from object', () => {
    const obj = {
      a: 'Hello World',
      b: null,
      c: undefined,
      d: '',
      e: 5,
      f: {},
    };

    expect(removeEmptyItems(obj)).toEqual({ a: 'Hello World', e: 5, f: {} });
  });

  // wait
  it('waits spacified time', async () => {
    jest.useFakeTimers();

    const spy = jest.fn();

    wait(50).then(spy);

    jest.advanceTimersByTime(49);
    // Jest limitation, must run this line
    // https://stackoverflow.com/questions/52673682/
    await Promise.resolve(); // let any pending callbacks in PromiseJobs run
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    await Promise.resolve(); // let any pending callbacks in PromiseJobs run
    expect(spy).toHaveBeenCalled();
  });

  // convertToObject
  it('converts any to object', () => {
    expect(convertToObject(null)).toEqual({});
    expect(convertToObject(undefined)).toEqual({});
    expect(convertToObject('fdsa9')).toEqual({});
    expect(convertToObject('[1,2,3,4]')).toEqual({});
    expect(convertToObject('{"a":5}')).toEqual({ a: 5 });
    expect(convertToObject({ a: 5 })).toEqual({ a: 5 });
    expect(convertToObject(5 as any)).toEqual({});
  });

  // castArray
  it('casts value to array', () => {
    expect(castArray(1)).toEqual([1]);
    expect(castArray('str')).toEqual(['str']);
    expect(castArray({ prop: 2 })).toEqual([{ prop: 2 }]);
    expect(castArray([1, 2])).toEqual([1, 2]);
  });

  // hasForbiddenKey
  it('disallows forbidden key', () => {
    const key = 'key';

    expect(hasForbiddenKey({ some: 'value' }, key)).toEqual(false);
    expect(hasForbiddenKey({ some: key }, key)).toEqual(false);
    expect(hasForbiddenKey({ some: { key } }, key)).toEqual(false);
    expect(hasForbiddenKey({ [key]: 'value' }, key)).toEqual(true);
    expect(hasForbiddenKey({ [`${key}_ext`]: 123 }, key)).toEqual(true);
    expect(hasForbiddenKey({ [`pre_${key}`]: 123 }, key)).toEqual(true);
  });

  // parseNumber
  it('returns correct number ', () => {
    expect(parseNumber('1.444')).toBe(1);
    expect(parseNumber(1)).toBe(1);
    expect(parseNumber(1.8)).toBe(1);
  });

  it('returns undefined for incorect value in parseNumber', () => {
    expect(parseNumber()).toBeUndefined();
    expect(parseNumber({ number: 1 })).toBeUndefined();
    expect(parseNumber('fsda')).toBeUndefined();
  });
});
