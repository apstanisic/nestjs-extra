import { BadRequestException } from '@nestjs/common';
import { ValidEmail } from './validate-email.pipe';

describe('Test ValidEmail pipe', () => {
  const email = 'testing@exampe.com';
  const pipe = new ValidEmail();
  it('throws if value is invalid email', () => {
    expect(() => pipe.transform()).toThrow(BadRequestException);
    expect(() => pipe.transform(undefined)).toThrow(BadRequestException);
    expect(() => pipe.transform(null)).toThrow(BadRequestException);
    expect(() => pipe.transform(5)).toThrow(BadRequestException);
    expect(() => pipe.transform('string')).toThrow(BadRequestException);
    expect(() => pipe.transform('string@')).toThrow(BadRequestException);
    expect(() => pipe.transform('string@ofjsd')).toThrow(BadRequestException);
    expect(() => pipe.transform({ obj: 'val' })).toThrow(BadRequestException);
    expect(() => pipe.transform({ obj: email })).toThrow(BadRequestException);
    expect(() => pipe.transform({ uuid: email })).toThrow(BadRequestException);
    expect(() => pipe.transform(['key'])).toThrow(BadRequestException);
    expect(() => pipe.transform([email])).toThrow(BadRequestException);
  });

  it('returns valid email', () => {
    expect(pipe.transform(email)).toBe(email);
  });
});
