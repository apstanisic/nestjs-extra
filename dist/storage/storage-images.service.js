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
const common_1 = require("@nestjs/common");
const faker_1 = require("faker");
const moment = require("moment");
const class_transformer_1 = require("class-transformer");
const consts_1 = require("../consts");
const sharp_1 = require("./sharp");
const storage_service_1 = require("./storage.service");
const image_entity_1 = require("../entities/image.entity");
let StorageImagesService = class StorageImagesService {
    constructor(storageService, sizes) {
        this.storageService = storageService;
        this.sizes = sizes;
    }
    storeImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = faker_1.random.uuid();
            const now = moment().format('YYYY/MM/DD');
            const folder = `${now}/${id}`;
            const filePrefix = `${folder}/image_${id}`;
            const buffersAndSizes = yield sharp_1.generateAllImageSizes(image, this.sizes);
            const toStore = buffersAndSizes.map(img => this.storageService.put(img.image, `${filePrefix}_${img.size}.jpeg`));
            const storedImagesArray = yield Promise.all(toStore);
            const storedImages = {};
            storedImagesArray.forEach((filename, i) => {
                storedImages[buffersAndSizes[i].size] = filename;
            });
            const imageObject = Object.assign(Object.assign({}, storedImages), { id, prefix: folder, position: 0 });
            return class_transformer_1.plainToClass(image_entity_1.Image, imageObject);
        });
    }
    removeImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageService.deleteWherePrefix(image.prefix);
        });
    }
};
StorageImagesService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(consts_1.STORAGE_IMAGE_SIZES)),
    __metadata("design:paramtypes", [storage_service_1.StorageService, Array])
], StorageImagesService);
exports.StorageImagesService = StorageImagesService;
//# sourceMappingURL=storage-images.service.js.map