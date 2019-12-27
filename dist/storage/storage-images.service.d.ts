/// <reference types="node" />
import { UUID } from '../types';
import { ImageSizeOptions } from './storage.module';
import { StorageService } from './storage.service';
import { Image } from '../entities/image.entity';
export declare class StorageImagesService {
    private readonly storageService;
    private readonly sizes;
    constructor(storageService: StorageService, sizes: ImageSizeOptions[]);
    storeImage(image: Buffer): Promise<Image>;
    removeImage(image: Image, allImages?: Image[]): Promise<Image[] | undefined>;
    removeImageById(id: UUID, images: Image[]): Promise<Image[]>;
    private removeImageFromArray;
    reorderImages(images: Image[], newOrder: UUID[]): Promise<Image[]>;
}
