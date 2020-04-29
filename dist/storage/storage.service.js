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
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const consts_1 = require("../consts");
let StorageService = class StorageService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger();
        const endPoint = this.config.get(consts_1.STORAGE_ENDPOINT);
        const region = this.config.get(consts_1.STORAGE_REGION);
        const accessKey = this.config.get(consts_1.STORAGE_ACCESS_KEY);
        const secretKey = this.config.get(consts_1.STORAGE_SECRET_KEY);
        const bucket = this.config.get(consts_1.STORAGE_BUCKET_NAME);
        if (!bucket || !endPoint || !accessKey || !secretKey || !region) {
            this.logger.error('Storage mounted, but storage keys are undefined.');
            throw new common_1.InternalServerErrorException();
        }
        this.bucketName = bucket;
        this.s3 = new aws_sdk_1.S3({
            region,
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
            endpoint: endPoint,
        });
    }
    getFile(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.s3
                .getObject({
                Key: key,
                Bucket: this.bucketName,
            })
                .promise()
                .then((res) => res.Body)
                .catch((e) => {
                console.error(e);
                throw new common_1.InternalServerErrorException('Image fetch failed');
            });
            return file;
        });
    }
    put(file, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = name.startsWith('/') ? name.substr(1) : name;
            return this.s3
                .putObject({
                Bucket: this.bucketName,
                Key: filename,
                Body: file,
                ACL: 'public-read',
            })
                .promise()
                .then((res) => filename);
        });
    }
    delete(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.s3.deleteObject({ Bucket: this.bucketName, Key: file }).promise();
        });
    }
    deleteWherePrefix(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const filenames = (yield this.listFiles(prefix)).map((Key) => ({ Key }));
            return this.s3
                .deleteObjects({
                Bucket: this.bucketName,
                Delete: { Objects: filenames },
            })
                .promise()
                .then((data) => filenames.map((f) => f.Key));
        });
    }
    listFiles(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.s3
                .listObjectsV2({ Bucket: this.bucketName, Prefix: prefix })
                .promise()
                .then((data) => {
                var _a, _b;
                const allKeys = (_b = (_a = data.Contents) === null || _a === void 0 ? void 0 : _a.map((con) => con === null || con === void 0 ? void 0 : con.Key)) !== null && _b !== void 0 ? _b : [];
                return allKeys.filter((key) => key !== undefined);
            });
        });
    }
};
StorageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map