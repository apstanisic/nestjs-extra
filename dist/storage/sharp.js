"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
async function generateAllImageSizes(image, sizes) {
    const base = sharp(image);
    const toWait = sizes.map(size => {
        var _a;
        return base
            .jpeg({ quality: (_a = size.quality) !== null && _a !== void 0 ? _a : 80 })
            .clone()
            .resize(size.width, size.height, { fit: size.fit })
            .toBuffer();
    });
    const images = await Promise.all(toWait);
    return sizes.map((size, i) => ({ size: size.name, image: images[i] }));
}
exports.generateAllImageSizes = generateAllImageSizes;
//# sourceMappingURL=sharp.js.map