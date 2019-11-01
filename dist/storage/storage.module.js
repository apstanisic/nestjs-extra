"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StorageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./storage.service");
const storage_images_service_1 = require("./storage-images.service");
const consts_1 = require("../consts");
const storage_images_default_config_1 = require("./storage-images-default-config");
let StorageModule = StorageModule_1 = class StorageModule {
    static forRoot({ imageSizes }) {
        const sizes = imageSizes || storage_images_default_config_1.defaultStorageImagesSizes;
        return {
            module: StorageModule_1,
            providers: [
                { provide: consts_1.STORAGE_IMAGE_SIZES, useValue: sizes },
                storage_service_1.StorageService,
                storage_images_service_1.StorageImagesService,
            ],
            exports: [storage_service_1.StorageService, storage_images_service_1.StorageImagesService],
        };
    }
};
StorageModule = StorageModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], StorageModule);
exports.StorageModule = StorageModule;
//# sourceMappingURL=storage.module.js.map