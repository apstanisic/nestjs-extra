import { Image } from '../entities/image.entity';
import { UUID } from '../types';
export declare function reorderImages(images: Image[], newOrder: UUID[]): Promise<Image[]>;
