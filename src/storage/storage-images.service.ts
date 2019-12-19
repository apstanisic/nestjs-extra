import { join as pathJoin } from 'path';
import { Injectable, Inject } from '@nestjs/common';
import * as moment from 'moment';
import { random } from 'faker';
import { StorageService } from './storage.service';
import { ImageSizes, Image, Struct, UUID } from '../types';
import { generateAllImageSizes } from './sharp';
import { STORAGE_IMAGE_SIZES } from '../consts';
import { ImageSizeOptions } from './storage.module';

/**
 * Storage service in charge of storing images.
 * It will generate multiple sizes of image.
 */
@Injectable()
export class StorageImagesService {
  constructor(
    private readonly storageService: StorageService,
    @Inject(STORAGE_IMAGE_SIZES) private readonly sizes: ImageSizeOptions[],
  ) {}

  /** Add new image. Name is quasi random number by default. */
  async addImage(image: Buffer): Promise<[ImageSizes, string, string]> {
    const uuid = random.uuid();
    const now = moment().format('YYYY/MM/DD');
    const basePath = `/${now}/${uuid}/image_${uuid}`;
    const buffersAndSizes = await generateAllImageSizes(image, this.sizes);
    // const toStore = [];
    const toStore = buffersAndSizes.map(img =>
      this.storageService.put(
        img.image,
        `${basePath}_${img.size}.jpeg`,
        img.size,
      ),
    );

    const imageSizes: Struct<string> = {};
    const allSizesArray = await Promise.all(toStore);
    allSizesArray.forEach(item => {
      const [filename, size] = item;
      imageSizes[size] = filename;
    });

    return [imageSizes, basePath, uuid];
  }

  /** Give object where every key is image size for deleting */
  async removeImageBySizes(image: ImageSizes): Promise<void> {
    if (!image) return Promise.resolve();
    const deleting = Object.keys(image).map(this.storageService.delete);
    await Promise.all(deleting);
  }

  /** Give common prefix for deleting images */
  async removeImageByPrefix(image: Image): Promise<string[]> {
    return this.storageService.deleteWherePrefix(image.prefix);
  }

  /** Delete image by id, and reorder images array */
  async removeImageById(id: UUID, allImages: Image[]): Promise<Image[]> {
    const image = allImages.find(img => img.id === id);
    if (!image) return allImages;

    await this.removeImageByPrefix(image);

    // Remove deleted image from array, and then fix array positions.
    return allImages
      .filter(img => img.id !== id)
      .map((img, i) => {
        img.position = i;
        return img;
      });
  }
}
