"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Faker = require("faker");
const image_entity_1 = require("./image.entity");
const random = Faker.random.arrayElement;
function generateImage(position) {
    const image = new image_entity_1.Image();
    image.xs = `https://via.placeholder.com/168.png`;
    image.sm = `https://via.placeholder.com/320.png`;
    image.md = `https://via.placeholder.com/640.png`;
    image.lg = `https://via.placeholder.com/1280.png`;
    image.prefix = `https://via.placeholder.com`;
    return image;
}
exports.generateImage = generateImage;
//# sourceMappingURL=image.factory.js.map