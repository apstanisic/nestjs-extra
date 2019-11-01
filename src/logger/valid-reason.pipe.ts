import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Validator } from 'class-validator';

/* */
/**
 * Get reason for action from request.
 * @example
 *   method(@Body('id', ValidReason) reason: string) {}
 */
@Injectable()
export class ValidReason implements PipeTransform<any, string | undefined> {
  private validator = new Validator();

  transform(value?: any): string | undefined {
    if (value === undefined) return value;

    if (!this.validator.isString(value)) {
      throw new BadRequestException('Invalid type.');
    }

    if (!this.validator.length(value, 3, 250)) {
      throw new BadRequestException('Must have between 3 and 250 chars.');
    }
    return value;
  }
}
