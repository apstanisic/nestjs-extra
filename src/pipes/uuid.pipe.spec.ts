import { BadRequestException } from '@nestjs/common';
import { ValidUUID } from './uuid.pipe';

describe('Test UUID pipe', () => {
  const uuid = '6809500c-d21a-11e9-bb65-2a2ae2dbcce4';
  const pipe: ValidUUID = new ValidUUID();

  it('throws on invalid values', () => {
    expect(() => pipe.transform()).toThrow(BadRequestException);
    expect(() => pipe.transform(undefined)).toThrow(BadRequestException);
    expect(() => pipe.transform(null)).toThrow(BadRequestException);
    expect(() => pipe.transform(5)).toThrow(BadRequestException);
    expect(() => pipe.transform('string')).toThrow(BadRequestException);
    expect(() => pipe.transform({ obj: 'val' })).toThrow(BadRequestException);
    expect(() => pipe.transform({ obj: uuid })).toThrow(BadRequestException);
    expect(() => pipe.transform({ uuid })).toThrow(BadRequestException);
    expect(() => pipe.transform(['key'])).toThrow(BadRequestException);
    expect(() => pipe.transform([uuid])).toThrow(BadRequestException);
  });

  it('returns uuid on valid value', () => {
    expect(pipe.transform(uuid)).toBe(uuid);
  });
});
