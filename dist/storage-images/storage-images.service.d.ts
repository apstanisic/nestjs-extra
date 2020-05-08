/// <reference types="node" />
import { Image } from '../entities/image.entity';
import { StorageService } from '../storage/storage.service';
import { ImageSize } from './storage-images.module';
export declare class StorageImagesService {
    private readonly storageService;
    private readonly sizes;
    constructor(storageService: StorageService, sizes: ImageSize[]);
    storeImage(image: Buffer, id?: string): Promise<Partial<Image>>;
    removeImage(image: Image): Promise<string[]>;
}
