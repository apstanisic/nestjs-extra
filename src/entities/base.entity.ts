import { Exclude, classToClass } from 'class-transformer';
import { BadRequestException, Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import { WithId } from '../types';

/**
 * All entities should extend this class. It has basic properties
 * and methods. There should be a specific reason to not extend this class
 * It has combined index for createdAt and id to improve pagination
 */
@Index(['createdAt', 'id'])
export abstract class BaseEntity implements WithId {
  /** Id can only be set in constructor, or by TypeOrm */
  constructor(id?: string | number) {
    if (id) this.id = id;
  }

  /** Unique Id */
  @PrimaryGeneratedColumn('uuid')
  readonly id: string | number;

  /** Date when entity was updated */
  @UpdateDateColumn({ precision: 3 })
  @Exclude()
  updatedAt: Date;

  /** Date when entity was created. It has index for cursor pagination */
  @CreateDateColumn({ precision: 3 })
  @Index()
  createdAt: Date;

  /**
   * All entities will be auto validated before inserting or updating.
   * Exclude private fields when returning errors.
   */
  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    let errors = await validate(this);

    if (errors.length > 0) {
      errors = errors.map(({ target, ...other }) => ({ ...other, target: classToClass(target) }));
      throw new BadRequestException(errors);
    }
  }
}
