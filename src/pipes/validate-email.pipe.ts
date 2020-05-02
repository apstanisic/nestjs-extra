import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

/**
 * Pipe to validate email
 * @example
 * method(@Param('id', ValidEmail) id: string) {}
 */
@Injectable()
export class ValidEmail implements PipeTransform<string, string> {
  transform(value?: any): string {
    if (!isEmail(value)) {
      throw new BadRequestException('Invalid email.');
    }
    return value;
  }
}
