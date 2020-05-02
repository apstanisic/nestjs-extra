import { PrimaryGeneratedColumn } from 'typeorm';
import { CoreEntity } from './base.entity';

export abstract class IncrementEntity extends CoreEntity {
  /** increment Id */
  @PrimaryGeneratedColumn('increment')
  id: number;
}
