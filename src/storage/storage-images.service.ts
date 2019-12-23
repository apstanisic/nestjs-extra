import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { random } from 'faker';
import * as moment from 'moment';
import { plainToClass } from 'class-transformer';
import { STORAGE_IMAGE_SIZES } from '../consts';
import { Struct, UUID } from '../types';
import { generateAllImageSizes } from './sharp';
import { ImageSizeOptions } from './storage.module';
import { StorageService } from './storage.service';
import { Image } from '../entities/image.entity';

interface Reorder {
  position?: number;
  images: Image[];
}

interface ImageOrder {
  id: UUID;
  position: number;
}

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
  async storeImage(image: Buffer): Promise<Image> {
    const id = random.uuid();
    const now = moment().format('YYYY/MM/DD');
    const folder = `${now}/${id}`;
    const filePrefix = `${folder}/image_${id}`;
    const buffersAndSizes = await generateAllImageSizes(image, this.sizes);
    // const toStore = [];
    const toStore = buffersAndSizes.map(img =>
      this.storageService.put(
        img.image,
        `${filePrefix}_${img.size}.jpeg`,
        img.size,
      ),
    );

    const sizes: Struct<string> = {};
    const allSizesArray = await Promise.all(toStore);
    allSizesArray.forEach(item => {
      const [filename, size] = item;
      sizes[size] = filename;
    });

    const imageObject = { ...sizes, id, prefix: folder, position: 0 };
    return plainToClass(Image, imageObject);
  }

  /** Store image, and put in right position in array */
  async addImage(image: Buffer, reorder: Reorder): Promise<Image[]> {
    // const images = await new ImageController(image).compress();
    // const images = reorder.images.sort((img1, img2) => img1.position > img)
    const orderedImagesArray = reorder.images.sort((img1, img2) =>
      (img1.position ?? -1) < (img2.position ?? 0) ? -1 : 1,
    );
    orderedImagesArray.forEach((img, i) => {
      img.position = i;
    });
    const storedImage = await this.storeImage(image);
    if (reorder.position === undefined) {
      // Store at last positioin
      storedImage.position = reorder.images.length + 1;
      // reorder.images.push({
      //   ...storedImage,
      //   position: reorder.images.length,
      // });
    } else {
      // orderedImagesArray.splice(reorder.position, 0, )
      // orderedImagesArray.splice(reorder?.position, 0, {
      // ...storedImage,
      //   position: reorder.position,
      // });
      // reorder.images.splice(reorder?.position, 0, {
      //   ...storedImage,
      //   position: reorder.position,
      // });
    }
    return reorder.images;
  }

  /**
   * Give common prefix for deleting images. Generics are not very helpfull.
   * If allImages not provided return undefined, if they are provided return
   * array without deleted image
   */
  async removeImage(
    image: Image,
    allImages?: Image[],
  ): Promise<Image[] | undefined> {
    // async removeImage(image: Image): Promise<string[]> {
    const deleted = await this.storageService.deleteWherePrefix(image.prefix);
    if (allImages === undefined) return undefined;
    return this.removeImageFromArray(image, allImages);
    // return undefined;
  }

  /** Delete image by id, and reorder images array */
  async removeImageById(id: UUID, allImages: Image[]): Promise<Image[]> {
    const image = allImages.find(img => img.id === id);
    if (!image) throw new NotFoundException();

    await this.removeImage(image);

    return this.removeImageFromArray(image, allImages);
  }

  /** Remove provided image from array */
  private removeImageFromArray(image: Image, allImages: Image[]): Image[] {
    return allImages
      .filter(img => img.id !== image.id)
      .map((img, i) => {
        img.position = i;
        return img;
      });
  }

  /** Reorder image */
  async reorderImages(images: Image[], newOrder: UUID[]): Promise<Image[]> {
    // Set position when specified
    images.forEach(img => {
      img.position = newOrder.indexOf(img.id);
    });
    // Where position does not exist, just asign next numbers
    images
      .filter(img => img.position === -1 || img.position === undefined)
      .forEach((img, i) => {
        img.position = newOrder.length + i;
      });
    return images;
    // Sort array by position
    // return images.sort((img1, img2) =>
    //   (img1.position ?? -1) < (img2.position ?? 0) ? -1 : 1,
    // );
  }
}
