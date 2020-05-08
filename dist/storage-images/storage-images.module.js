"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StorageImagesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const consts_1 = require("../consts");
const storage_images_default_config_1 = require("./storage-images-default-config");
const storage_images_service_1 = require("./storage-images.service");
let StorageImagesModule = StorageImagesModule_1 = class StorageImagesModule {
    static forRoot(options) {
        var _a;
        const sizes = (_a = options === null || options === void 0 ? void 0 : options.imageSizes) !== null && _a !== void 0 ? _a : storage_images_default_config_1.defaultImagesSizes;
        return {
            module: StorageImagesModule_1,
            providers: [storage_images_service_1.StorageImagesService, { provide: consts_1.STORAGE_IMAGE_SIZES, useValue: sizes }],
            exports: [storage_images_service_1.StorageImagesService],
        };
    }
};
StorageImagesModule = StorageImagesModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], StorageImagesModule);
exports.StorageImagesModule = StorageImagesModule;
//# sourceMappingURL=storage-images.module.js.map