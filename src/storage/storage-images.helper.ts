import { Image } from '../entities/image.entity';
import { UUID } from '../types';

/**
 * Reorder image. This is a helper method for common usecase.
 * When image is deleted positioning is invalid. This method repairs that.
 * Also when user want to reorder images this method should be called.
 */
export async function reorderImages(images: Image[], newOrder: UUID[]): Promise<Image[]> {
  // Set position when specified
  images.forEach(img => {
    img.position = newOrder.indexOf(img.id);
  });
  // Where position does not exist, just asign next numbers and keep same order
  images
    .filter(img => img.position === -1 || img.position === undefined)
    .forEach((img, i) => {
      img.position = newOrder.length + i;
    });

  return images;
}
