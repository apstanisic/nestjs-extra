import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class Image extends BaseEntity {
  /** Part of path all sizes have in common. Usefull for deleting. */
  @Column()
  prefix: string;

  /**
   * Original file. Used temporarily until mq converts to different sizes
   * Then this file gets deleted
   */
  @Column({ nullable: true })
  original?: string;

  /** Thumbnail (non nullable) */
  @Column()
  xs: string; // 168px

  /** Small */
  @Column({ nullable: true })
  sm?: string; // 320px

  /** Medium */
  @Column({ nullable: true })
  md?: string; // 640px

  /** Large  */
  @Column({ nullable: true })
  lg?: string; // 1280px

  /** Extra large */
  @Column({ nullable: true })
  xl?: string; // not used in most apps
}
