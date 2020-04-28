import * as Faker from 'faker';
import { Validator, isBase64 } from 'class-validator';
import { GenerateCursor } from './_generate-cursor';

describe('Propertly generating pagination cursor', () => {
  const uuid = Faker.random.uuid();

  it('Should generate valid base64 cursor', () => {
    const entity = {
      id: uuid,
      createdAt: new Date(),
    };
    const generator = new GenerateCursor(entity, 'next', 'createdAt');
    expect(isBase64(generator.cursor)).toBe(true);
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
    expect(() => new GenerateCursor(entity as any, 'next', 'createdAt')).toThrow();
    expect(() => new GenerateCursor({ id: undefined } as any, 'next')).toThrow();
  });

  it('Should throw if column not provided', () => {
    const entity = { id: Faker.random.uuid() };

    expect(() => {
      const generator = new GenerateCursor(entity, 'next', 'createdAt');
    }).toThrow();
  });

  it('Should use string without trying to convert to date', () => {
    const { cursor } = new GenerateCursor({ id: uuid, price: 41 }, 'next', 'price');
    expect(isBase64(cursor)).toBe(true);
  });

  it('Should should throw if value undefined', () => {
    expect(() => new GenerateCursor({ id: uuid, price: undefined }, 'next', 'price')).toThrow();
  });
});
