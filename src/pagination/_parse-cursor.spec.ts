import * as Faker from 'faker';
import { FindOperator } from 'typeorm';
import { ParseCursor } from './_parse-cursor';
import { GenerateCursor } from './_generate-cursor';

/** @todo Test generated query */
describe('Check if ParseCursor parses correctly', () => {
  const uuid = Faker.random.uuid();

  it('Should generate proper TypeOrm raw query', () => {
    const generated = new GenerateCursor({ id: uuid, createdAt: new Date() }, 'next', 'createdAt')
      .cursor;
    const parsed = new ParseCursor(generated, 'ASC', 'test_table');
    expect(parsed.query).toHaveProperty('createdAt');
    expect(parsed.query).not.toHaveProperty('id');
    expect(parsed.query.createdAt).toBeInstanceOf(FindOperator);
  });

  // it('Should throw on invalid params', () => {
  //   const now = new Date();
  //   expect(() => new ParseCursor('f29j9823jf232rj8j9')).toThrow();

  //   const withInvalidId = `invalid-uuid;createdAt;${now.getTime()}`;
  //   expect(() => new ParseCursor(withInvalidId)).toThrow();

  //   const withoutValue = `${uuid};someColumn`;
  //   expect(() => new ParseCursor(withoutValue)).toThrow();
  // });
});
