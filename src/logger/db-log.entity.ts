import { InternalServerErrorException } from '@nestjs/common';
import { classToClass, plainToClass } from 'class-transformer';
import { diff } from 'deep-diff';
import { Entity, BeforeInsert, BeforeUpdate, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BasicUserInfo, IUser } from '../entities/user.interface';
import { UUID, WithId } from '../types';

/**
 * This entity is using MongoDb. TypeOrm currently supports only this NoSql db.
 * It's better then to store in Sql. This class can't extend BaseEntity because
 * it does not have primary field.
 */
@Entity('logs')
export class DbLog<T extends WithId = any> extends BaseEntity {
  /** What action was executed (delete, update, custom-action) */
  @Column({ default: 'update' })
  action: 'update' | 'delete' | 'create' | string;

  /** Why is this action executed. */
  @Column({ nullable: true })
  reason?: string;

  /** Who executed this action */
  //   @ManyToOne(type => User)
  //   @Column(type => BasicUserInfo)
  @Column({ type: 'jsonb' })
  executedBy: BasicUserInfo | IUser;

  @Column()
  executedById: UUID;

  /** Value before changes. For creating it will be null. Don't set directly. */
  @Column({ nullable: true, type: 'jsonb' })
  initialValue?: T;

  /** Diff of changes. */
  @Column({ type: 'jsonb' })
  changes: any;

  /**
   * Entity that has been changed (or created, or deleted).
   * If action is create, use id after creating.
   */
  @Column()
  entityId: UUID;

  /**
   * Domain of this log.
   * Used for finding only logs that belong to specific domain.
   * Example: Get logs only for this company.
   * It can be company, web store, school, group.
   */
  @Column({ nullable: true })
  domainId?: UUID;

  /** Temp value only used for getting id if there is not old value. */
  private _newValue?: T;

  /** This will generate difference between new and old values. */
  set newValue(value: T | undefined) {
    this.changes = diff(this.initialValue, value);
    this._newValue = value;
  }

  /** Transform data */
  @BeforeInsert()
  _prepare(): void {
    this.executedBy = plainToClass(BasicUserInfo, this.executedBy);
    this.executedById = this.executedBy.id;
    // Remove sensitive properties (passwords, cc numbers...)
    this.initialValue = classToClass(this.initialValue);
    // Get entity id from provided values.
    if (this.initialValue?.id) {
      this.entityId = this.initialValue.id;
    } else if (this._newValue?.id) {
      this.entityId = this._newValue.id;
    }
  }

  /** Logs can't be updated */
  @BeforeUpdate()
  throwError(): void {
    throw new InternalServerErrorException();
  }
}
