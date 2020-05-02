import { Column } from 'typeorm';
import { UuidEntity } from './base-uuid.entity';

export class Image extends UuidEntity {
  /**
   * Original file. Used temporarily until app generates  different sizes
   * Then this file gets deleted
   */
  @Column({ nullable: true })
  original?: string;

  /** Part of path all sizes have in common. Used for deleting. */
  @Column()
  prefix: string;

  /** Thumbnail (non nullable) */
  @Column()
  xs: string; // 168px

  /** Small */
  @Column({ nullable: true })
  sm: string; // 320px

  /** Medium */
  @Column({ nullable: true })
  md: string; // 640px

  /** Large  */
  @Column({ nullable: true })
  lg: string; // 1280px

  /** Extra large */
  @Column({ nullable: true })
  xl: string; // not used in most apps
}
