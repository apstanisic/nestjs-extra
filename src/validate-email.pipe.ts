import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class ValidEmail implements PipeTransform<string, string> {
  private validator = new Validator();

  transform(value?: any): string {
    if (!this.validator.isEmail(value)) {
      throw new BadRequestException('Invalid email.');
    }
    return value;
  }
}
