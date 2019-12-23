import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class Image extends BaseEntity {
  @Column({ nullable: true })
  position?: number; // In case of storing image in array. Zero index

  @Column()
  prefix: string; // Part of images path that are common for all sizes

  // Non nullable because it's for thumbnail
  @Column()
  xs: string; // 168px

  @Column({ nullable: true })
  sm?: string; // 320px

  @Column({ nullable: true })
  md?: string; // 640px

  @Column({ nullable: true })
  lg?: string; // 1280px

  @Column({ nullable: true })
  xl?: string; // not used in most apps
}
