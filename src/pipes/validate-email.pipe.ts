import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class ValidEmail implements PipeTransform<string, string> {
  transform(value?: any): string {
    if (!isEmail(value)) {
      throw new BadRequestException('Invalid email.');
    }
    return value;
  }
}
