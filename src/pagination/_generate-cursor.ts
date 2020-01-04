import { BadRequestException } from '@nestjs/common';
import { WithId } from '../types';

/**
 * Generate cursor from entity and column name
 * It will throw an error if entity does not have filed with column name
 * UUID is used just in case if value has multiple instances
 * Direction is not sort by, it is used for knowing if we should get
 * previous page or next page
 * return uuid;columnName;value;direction in base64
 * @example
 *  some-uuid;createdAt;540918254;prev
 *
 */
export class GenerateCursor<T extends WithId = any> {
  /** Generated cursor */
  cursor: string;

  constructor(
    private entity: T,
    private direction: 'prev' | 'next',
    private column: string = 'createdAt',
  ) {
    if (this.entity.id === undefined) throw new BadRequestException('No id');
    const value = this.getColumnValueFromEntity();
    // Converts normal text to base64
    // this.cursor = Buffer.from(
    //   `${this.entity.id};${this.column};${value};${this.direction}`,
    //   'ascii',
    // ).toString('base64');
    this.cursor = `${this.entity.id};${this.column};${value};${this.direction}`;
    // this.cursor = encodeURI(this.cursor);
    //
  }

  /** Get value from entity from provided column. Throw error if null value */
  private getColumnValueFromEntity(): any {
    const value = this.entity[this.column];
    if (value === undefined) {
      throw new BadRequestException('Column either does not exist or is nullable');
    }
    if (value instanceof Date) {
      return value.getTime();
    }
    return value;
  }
}
