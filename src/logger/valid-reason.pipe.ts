import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { length } from 'class-validator';

/* */
/**
 * Get reason for action from request.
 * @example
 * method(@Body('id', ValidReason) reason: string) {}
 */
@Injectable()
export class ValidReason implements PipeTransform<any, string | undefined> {
  transform(value?: any): string | undefined {
    if (!length(value, 3, 250)) {
      throw new BadRequestException('Must have between 3 and 250 chars.');
    }
    return value;
  }
}
