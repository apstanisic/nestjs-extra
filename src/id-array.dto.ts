import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, ArrayUnique, IsArray, IsUUID } from 'class-validator';
import { UUID } from './types';

/** When fetching many entities with id, every id must pass this validation */
export class IdArrayDto {
  @Transform((value) => {
    // If it's already array, return array
    if (Array.isArray(value)) return value;
    // If it's not array and not string throw an error
    if (typeof value !== 'string') throw new BadRequestException('Ids are not valid');
    // convert string to array, and remove empty item if ids are empty
    return value.split(',').filter((v) => v !== '');
  })
  @IsArray()
  @ArrayMaxSize(50)
  @ArrayUnique()
  @IsUUID('4', { each: true })
  ids: UUID[];
}
