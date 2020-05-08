"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const faker_1 = require("faker");
const moment = require("moment");
const consts_1 = require("../consts");
const storage_service_1 = require("../storage/storage.service");
const sharp_1 = require("./sharp");
let StorageImagesService = class StorageImagesService {
    constructor(storageService, sizes) {
        this.storageService = storageService;
        this.sizes = sizes;
    }
    async storeImage(image, id = faker_1.random.uuid()) {
        const today = moment().format('YYYY/MM/DD');
        const folder = `${today}/${id}`;
        const filePrefix = `${folder}/image_${id}`;
        const buffersAndSizes = await sharp_1.generateAllImageSizes(image, this.sizes);
        const toStore = buffersAndSizes.map((img) => this.storageService.put(img.image, `${filePrefix}_${img.size}.jpeg`));
        const storedImagesArray = await Promise.all(toStore);
        const storedImages = {};
        storedImagesArray.forEach((filename, i) => {
            storedImages[buffersAndSizes[i].size] = filename;
        });
        const imageObject = { ...storedImages, id, prefix: folder };
        return imageObject;
    }
    async removeImage(image) {
        return this.storageService.deleteWherePrefix(image.prefix);
    }
};
StorageImagesService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(consts_1.STORAGE_IMAGE_SIZES)),
    __metadata("design:paramtypes", [storage_service_1.StorageService, Array])
], StorageImagesService);
exports.StorageImagesService = StorageImagesService;
//# sourceMappingURL=storage-images.service.js.map