import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Validator, isUUID } from 'class-validator';

/**
 * Pipe to get page for pagination
 * @example
 * method(@Param('id', ValidUUID) id: string) {}
 */
@Injectable()
export class ValidUUID implements PipeTransform<string, string> {
  transform(value?: any): string {
    if (!isUUID(value)) {
      throw new BadRequestException('Id is not valid.');
    }
    return value;
  }
}
