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
import { WithId, IdType } from '../types';
import { validateEntity } from './validate-entity';

/**
 * All entities should extend this class. It has basic properties
 * and methods. There should be a specific reason to not extend this class
 * It has combined index for createdAt and id to improve pagination
 */
@Index(['createdAt', 'id'])
export abstract class CoreEntity implements WithId {
  /** Unique Id */
  id: IdType;

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
  // @BeforeInsert()
  // @BeforeUpdate()
  async validate(): Promise<void> {
    await validateEntity(this);
  }
}
