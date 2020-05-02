import { isUUID } from 'class-validator';
import * as Faker from 'faker';
import { ManyUUID } from './many-uuid.pipe';

describe('Many UUID pipe', () => {
  const pipe = new ManyUUID();
  const uuid = Faker.random.uuid();

  it('transforms values to uuids', () => {
    expect(pipe.transform(`["${uuid}"]`).length).toBe(1);
    expect(pipe.transform(`["${uuid}", "${uuid}"]`).length).toBe(2);

    const ids = pipe.transform(`["${uuid}", "${uuid}"]`);
    expect(ids.every((id) => isUUID(id))).toBe(true);
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
