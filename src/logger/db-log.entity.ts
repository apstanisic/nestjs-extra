import { InternalServerErrorException } from '@nestjs/common';
import { classToClass, plainToClass, classToPlain } from 'class-transformer';
import { diff } from 'deep-diff';
import { Entity, BeforeInsert, BeforeUpdate, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BasicUserInfo, IUser } from '../users/user.interface';
import { UUID, WithId } from '../types';
import { BaseUser } from '../users/base-user.entity';

/**
 * This entity is using MongoDb. TypeOrm currently supports only this NoSql db.
 * It's better then to store in Sql. This class can't extend BaseEntity because
 * it does not have primary field.
 */
@Entity('logs')
export class DbLog<T extends WithId = any, User extends BaseUser = BaseUser> extends BaseEntity {
  /** What action was executed (delete, update, custom-action) */
  @Column({ default: 'update' })
  action: 'create' | 'update' | 'delete' | string;

  /** Why is this action executed. */
  @Column({ nullable: true })
  reason?: string;

  /** Who executed this action. Backup data in case of user deleting account */
  @Column({ type: 'jsonb' })
  executedByInfo: BasicUserInfo;

  @ManyToOne('User', { onDelete: 'SET NULL', nullable: true })
  executedBy: User;

  @Column()
  executedById: UUID;

  /** Value before changes. Default is {} for easier comparison. */
  @Column({ type: 'jsonb', default: {} })
  oldValue: T | Record<string, any>;

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
    this.changes = diff(this.oldValue, value);
    this._newValue = value;
  }

  /** Transform data */
  @BeforeInsert()
  _prepare(): void {
    // Remove sensitive data from user
    const user = classToPlain(this.executedBy);
    this.executedByInfo = plainToClass(BasicUserInfo, user, {
      excludeExtraneousValues: true,
    });
    this.executedById = this.executedBy.id;

    // Remove sensitive properties (passwords, cc numbers...)
    this.oldValue = classToClass(this.oldValue) ?? {};

    // Get entity id from provided values.
    if (this.oldValue?.id) {
      this.entityId = this.oldValue.id;
    } else if (this._newValue?.id) {
      this.entityId = this._newValue.id;
    } else {
      throw new InternalServerErrorException();
    }
  }

  /** Logs can't be updated */
  @BeforeUpdate()
  preventUpdate(): void {
    throw new InternalServerErrorException();
  }
}
