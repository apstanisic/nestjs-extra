import { Exclude, classToClass } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Index
} from 'typeorm';

/**
 * All entities should extend this class. It has basic properties
 * and methods. There should be a specific reason to not extend this class
 * It has combined index for createdAt and id to improve pagination
 */
@Index(['createdAt', 'id'])
export abstract class BaseEntity {
  /** Id can only be set in constructor */
  constructor(id?: string) {
    if (id) this.id = id;
  }

  /** Unique Id */
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  /**
   * Date when entity was last updated.
   * 3 point precision, keep track of miliseconds.
   * Don't need more.
   */
  @UpdateDateColumn({ precision: 3 })
  @Exclude()
  updatedAt: Date;

  /** Date when entity was created. It has index for cursor pagination */
  @CreateDateColumn({ precision: 3 })
  @Index()
  createdAt: Date;

  /** All entities will be auto validated before inserting or updating. */
  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    let errors = await validate(this);
    // Exclude some private fields. Those fields are excluded when transformed.

    if (errors.length > 0) {
      errors = errors.map(({ target, ...other }) => ({
        ...other,
        target: classToClass(target)
      }));
      if (process.env.NODE_ENV !== 'production') {
        console.log(errors);
      }

      throw new BadRequestException(errors);
    }
  }
}
