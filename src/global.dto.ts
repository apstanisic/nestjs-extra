import {
  IsString,
  MinLength,
  IsOptional,
  IsNumberString
} from 'class-validator';

export class IdParam {
  @IsString()
  @MinLength(10)
  id: string;
}

export class PageParam {
  @IsOptional()
  @IsNumberString()
  page: string = '1';
}
