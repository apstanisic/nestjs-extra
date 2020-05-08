/**
 * Multer options for valid jpeg.
 * @param sizeInMb How big image can be in mb, accepts int of float
 */
export function validJpeg(sizeInMb = 1): any {
  return {
    limits: { fileSize: 1024 * 1024 * sizeInMb },
    fileFilter: (req: any, file: any, done: any): void => {
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
        done(null, false);
      } else {
        done(null, true);
      }
    },
  };
}
