/// <reference types="node" />
import { ImageSizeOptions } from './storage.module';
import { StorageService } from './storage.service';
import { Image } from '../entities/image.entity';
export declare class StorageImagesService {
    private readonly storageService;
    private readonly sizes;
    constructor(storageService: StorageService, sizes: ImageSizeOptions[]);
    storeImage(image: Buffer, id?: string | number): Promise<Partial<Image>>;
    removeImage(image: Image): Promise<string[]>;
}
