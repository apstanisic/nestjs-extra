import { PrimaryGeneratedColumn } from 'typeorm';
import { CoreEntity } from './base.entity';

export abstract class UuidEntity extends CoreEntity {
  /** Unique Id */
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
