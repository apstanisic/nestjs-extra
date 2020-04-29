import * as Faker from 'faker';
import { Image } from './image.entity';

const random = Faker.random.arrayElement;

/**
 * Return placeholder data
 * @todo Not working currently for real images
 */
export function generateImage(position: number): Image {
  const image = new Image();
  image.position = position;
  image.xs = `https://via.placeholder.com/168.png`;
  image.sm = `https://via.placeholder.com/320.png`;
  image.md = `https://via.placeholder.com/640.png`;
  image.lg = `https://via.placeholder.com/1280.png`;
  image.prefix = `https://via.placeholder.com`;

  return image;
}
