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
function reorderImages(images, newOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        images.forEach((img) => {
            img.position = newOrder.indexOf(img.id);
        });
        images
            .filter((img) => img.position === -1 || img.position === undefined)
            .forEach((img, i) => {
            img.position = newOrder.length + i;
        });
        return images;
    });
}
exports.reorderImages = reorderImages;
//# sourceMappingURL=storage-images.helper.js.map