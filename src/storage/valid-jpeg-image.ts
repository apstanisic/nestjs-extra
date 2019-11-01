/** Molter options */
export function validJpeg(sizeInMb: number = 1) {
  return {
    limits: { fileSize: 1024 * 1024 * sizeInMb }, // 0.4 mb
    fileFilter: (req: any, file: any, done: any): void => {
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
        done(null, false);
      } else {
        done(null, true);
      }
    }
  };
}
