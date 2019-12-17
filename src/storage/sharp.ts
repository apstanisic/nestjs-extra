import * as sharp from 'sharp';
import { ImageSizeOptions } from './storage.module';

type Sizes = 'xs' | 'sm' | 'md' | 'lg';

interface BufferWithSize {
  size: string;
  image: Buffer;
}
/**
 * Compress and generate different sizes for saving to external services
 * @param image Image to be compressed, and generate different sizes
 */
export async function generateAllImageSizes(
  image: Buffer,
  sizes: ImageSizeOptions[],
): Promise<BufferWithSize[]> {
  const base = sharp(image);
  // .jpeg({ quality: 70 });
  const toWait = sizes.map(size =>
    base
      .jpeg({ quality: size.quality || 80 })
      .clone()
      .resize(size.width, size.height, { fit: size.fit })
      .toBuffer(),
  );
  const images = await Promise.all(toWait);
  return sizes.map((size, i) => ({ size: size.name, image: images[i] }));
}
