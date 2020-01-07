import { IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, Index } from 'typeorm';
import { BaseUserWithRoles } from '../../users/base-user-with-roles.entity';
// import { User } from "../../user/user.entity";
import { BaseEntity } from '../../entities/base.entity';

/**
 * To add admin for company f32 to user
 * @example
 * const role = new Role();
 * role.user = user;
 * role.domain = 'f32';
 * role.name = 'admin';
 * role.description = 'You are admin in company f32. Happy b-day';
 * repo.save(role);
 */
@Entity('roles')
export class Role<User = BaseUserWithRoles> extends BaseEntity {
  /** User that have this role */
  @ManyToOne('User', { onDelete: 'CASCADE' })
  user: User;

  /** User's id */
  @Column()
  @Index()
  userId: string;

  /** Role name */
  @Column()
  @IsString()
  @Length(1, 60)
  name: string;

  /**
   * Domain this role belongs to. In this app domain is company
   * In other domain can be city, or store. Domain limit the reach of user.
   * Keep domain as string so it can be portable and not app specific.
   * @Example /companies/ojpdsoifjsdpoifjas/*
   */
  @Column()
  @IsString()
  domain: string;

  /**
   * Description for this specific role to this user.
   * For example, owner can leave reason why admin have this role.
   */
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 200)
  description?: string;
}
