import { parseQuery } from './parse-to-orm-query';
import { Struct } from '../types';

describe('Parse object to orm query', () => {
  let obj: Struct;

  beforeEach(() => {
    obj = {
      field: 'some-value',
      field1__lt: 'some-value',
      field2__gt: 'some-value',
      field3__lte: 'some-value',
      field4__gte: 'some-value',
      field5__lk: 'some-value',
      field6__in: '[1,2,3,4]',
      field7__btw: '[1,3]',
      field8__eq: 'some-value',
      field9: 'some-value',
      // field8__man: 'some-value',
    };
  });

  it('propertly parses fields', () => {
    const parsed = parseQuery(obj);
    expect(Object.keys(parsed).length).toBe(Object.keys(obj).length);
  });

  it('removes invalid fields', () => {
    obj.field6__in = 'non array string';
    obj.field7__btw = 'non array string';
    const parsed = parseQuery(obj);
    expect(Object.keys(parsed).length).toBe(Object.keys(obj).length - 2);
  });

  it('removes btw field if not array and have other then 2 fields', () => {
    obj.field7__btw = [1, 2, 3];
    const parsed = parseQuery(obj);
    expect(Object.keys(parsed).length).toBe(Object.keys(obj).length - 1);
  });

  it('checks for array normaly', () => {
    obj.field6__in = [1, 2, 3, 4, 5];
    const parsed = parseQuery(obj);
    expect(Object.keys(parsed).length).toBe(Object.keys(obj).length);
  });

  it('removes in field if not array', () => {
    obj.field6__in = { a: 'Hello', b: 'World' };
    const parsed = parseQuery(obj);
    expect(Object.keys(parsed).length).toBe(Object.keys(obj).length - 1);
  });

  it('ignores params that start with pg', () => {
    obj.pg__order = 'ASC';
    const parsed = parseQuery(obj);
    expect(Object.keys(parsed).length).toBe(Object.keys(obj).length - 1);
  });
});
