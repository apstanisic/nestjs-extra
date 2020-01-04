import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, ArrayUnique, IsArray, IsUUID } from 'class-validator';
import { UUID } from './types';

/** When fetching many entities with id, every id must pass this validation */
export class IdArrayDto {
  @Transform(value => {
    if (typeof value !== 'string') throw new BadRequestException();
    return value.split(',');
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(50)
  @ArrayUnique()
  @IsUUID('4', { each: true })
  ids: UUID[];
}
