import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class Image extends BaseEntity {
  /** If some entity have multiple images, this is images position in array. Starts at 0 */
  @Column({ nullable: true })
  position?: number;

  /** Part of path all sizes have in common. Usefull for deleting. */
  @Column()
  prefix: string;

  /** Thumbnail (non nullable) */
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
