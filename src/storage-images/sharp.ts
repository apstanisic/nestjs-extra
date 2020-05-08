import * as sharp from 'sharp';
import { ImageSize } from './storage-images.module';

interface BufferWithSize {
  size: string;
  image: Buffer;
}
/**
 * Compress and generate different sizes for saving to external services
 * @param image Image to be compressed, and generate different sizes
 * @param sizes Options for every size to be saved
 * @returns Single promise with array of objects that contain size name, and image buffer
 */
export async function generateAllImageSizes(
  image: Buffer,
  sizes: ImageSize[],
): Promise<BufferWithSize[]> {
  const base = sharp(image);
  const toWait = sizes.map((size) =>
    base
      .jpeg({ quality: size.quality ?? 80 })
      .clone()
      .resize(size.width, size.height, { fit: size.fit })
      .toBuffer(),
  );
  const images = await Promise.all(toWait);
  return sizes.map((size, i) => ({ size: size.name, image: images[i] }));
}
