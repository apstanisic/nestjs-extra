import { InternalServerErrorException } from '@nestjs/common';
import { classToClass, plainToClass, classToPlain } from 'class-transformer';
import { diff } from 'deep-diff';
import { Entity, BeforeInsert, BeforeUpdate, Column, ManyToOne } from 'typeorm';
import { CoreEntity } from '../entities/base.entity';
import { BasicUserInfo, IUser } from '../users/user.interface';
import { UUID, WithId, IdType } from '../types';
import { BaseUser } from '../users/base-user.entity';
import { UuidEntity } from '../entities/base-uuid.entity';

/**
 * This entity is using MongoDb. TypeOrm currently supports only this NoSql db.
 * It's better then to store in Sql. This class can't extend BaseEntity because
 * it does not have primary field.
 */
@Entity('activity_logs')
export class ActivityLog<
  T extends WithId = any,
  User extends BaseUser = BaseUser
> extends UuidEntity {
  constructor(private readonly oldValue: any) {
    super();
  }

  /**
   * What action was executed (delete, update, custom-action)
   */
  @Column({ default: 'update' })
  action: 'create' | 'update' | 'delete' | string;

  /**
   * Entity that has been changed (or created, or deleted).
   * If action is create, use id after creating.
   */
  @Column()
  entityId: IdType;

  /**
   * Why is this action executed.
   */
  @Column({ nullable: true })
  reason?: string;

  /**
   * Db table
   */
  @Column()
  collection: string;

  /**
   * Who executed this action. Backup data in case of user deleting account.
   * Also in case user changes all personal data, and then delete account,
   * we'll know original info.
   */
  @Column({ type: 'simple-json' })
  executedByInfo: BasicUserInfo;

  /**
   * Relation to who executed action
   */
  @ManyToOne('User', { onDelete: 'SET NULL', nullable: true })
  executedBy: User;

  /**
   * Id of user who executed action. For executedBy: User field in db.
   */
  @Column()
  executedById: IdType;

  /**
   * Value before changes. Default is {} for easier comparison.
   */
  @Column({ type: 'simple-json' })
  newValue: T | Record<string, any>;

  /**
   * Diff of changes.
   */
  @Column({ type: 'simple-json' })
  delta: any;

  /**
   * Domain of this log.
   * Used for finding only logs that belong to specific domain.
   * Usefull in multi tenant application
   * Example: Get logs only for this company.
   * It can be company, web store, school, group.
   */
  @Column({ nullable: true })
  domainId?: IdType;

  /** Transform data */
  @BeforeInsert()
  _prepare(): void {
    // Remove sensitive data from user
    const user = classToPlain(this.executedBy);
    this.executedByInfo = plainToClass(BasicUserInfo, user, { excludeExtraneousValues: true });
    this.executedById = this.executedBy.id;

    // Remove sensitive properties (passwords, cc numbers...)
    this.newValue = classToClass(this.newValue);
    this.delta = diff(this.oldValue, this.newValue);

    // Get entity id from provided values.
    if (this.oldValue?.id) {
      this.entityId = this.oldValue.id;
    } else if (this.newValue?.id) {
      this.entityId = this.newValue.id;
    } else {
      throw new InternalServerErrorException();
    }
  }

  /** Logs can't be updated */
  @BeforeUpdate()
  preventUpdate(): void {
    throw new InternalServerErrorException('Log update forbidden');
  }
}
