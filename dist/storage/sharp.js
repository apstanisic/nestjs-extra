"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
function generateAllImageSizes(image, sizes) {
    return __awaiter(this, void 0, void 0, function* () {
        const base = sharp(image);
        const toWait = sizes.map(size => {
            var _a;
            return base
                .jpeg({ quality: (_a = size.quality) !== null && _a !== void 0 ? _a : 80 })
                .clone()
                .resize(size.width, size.height, { fit: size.fit })
                .toBuffer();
        });
        const images = yield Promise.all(toWait);
        return sizes.map((size, i) => ({ size: size.name, image: images[i] }));
    });
}
exports.generateAllImageSizes = generateAllImageSizes;
//# sourceMappingURL=sharp.js.map