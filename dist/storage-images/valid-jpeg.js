"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validJpeg(sizeInMb = 1) {
    return {
        limits: { fileSize: 1024 * 1024 * sizeInMb },
        fileFilter: (req, file, done) => {
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
                done(null, false);
            }
            else {
                done(null, true);
            }
        },
    };
}
exports.validJpeg = validJpeg;
//# sourceMappingURL=valid-jpeg.js.map