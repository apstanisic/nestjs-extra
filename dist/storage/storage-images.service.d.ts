/// <reference types="node" />
import { Image } from '../entities/image.entity';
import { ImageSizeOptions } from './storage.module';
import { StorageService } from './storage.service';
export declare class StorageImagesService {
    private readonly storageService;
    private readonly sizes;
    constructor(storageService: StorageService, sizes: ImageSizeOptions[]);
    storeImage(image: Buffer, id?: string): Promise<Partial<Image>>;
    removeImage(image: Image): Promise<string[]>;
}
