import { Image } from './image.entity';

/**
 * Return placeholder data
 * @todo Not working currently for real images
 */
export function generateImage(): Image {
  const image = new Image();
  image.xs = `https://via.placeholder.com/168.png`;
  image.sm = `https://via.placeholder.com/320.png`;
  image.md = `https://via.placeholder.com/640.png`;
  image.lg = `https://via.placeholder.com/1280.png`;
  image.xl = `https://via.placeholder.com/1920.png`;
  image.prefix = `https://via.placeholder.com`;

  return image;
}
