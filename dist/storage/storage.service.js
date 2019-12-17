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
const minio_1 = require("minio");
const config_service_1 = require("../config/config.service");
const consts_1 = require("../consts");
const helpers_1 = require("../helpers");
const publicReadPolicy_1 = require("./publicReadPolicy");
let StorageService = class StorageService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger();
        const endPoint = this.config.get(consts_1.STORAGE_GATEWAY);
        const accessKey = this.config.get(consts_1.STORAGE_ACCESS_KEY);
        const secretKey = this.config.get(consts_1.STORAGE_SECRET_KEY);
        const bucket = this.config.get(consts_1.STORAGE_BUCKET_NAME);
        if (!bucket || !endPoint || !accessKey || !secretKey) {
            this.logger.error('Storage mounted, but storage keys are undefined.');
            throw new common_1.InternalServerErrorException();
        }
        this.bucket = bucket;
        this.client = new minio_1.Client({
            endPoint,
            accessKey,
            secretKey,
            port: 9000,
            useSSL: false,
        });
        this.client.setBucketPolicy(this.bucket, publicReadPolicy_1.allowReadPolicy(this.bucket), err2 => {
            if (err2 !== null)
                throw new common_1.InternalServerErrorException(`Bucket policy problem: ${err2}`);
        });
        this.client.bucketExists(this.bucket, (err, exist) => {
            if (err !== null)
                throw new common_1.InternalServerErrorException(`Storage problem: ${err}`);
            if (!exist) {
                this.client.makeBucket(this.bucket, 'us-east-1', err1 => {
                    if (err !== null) {
                        throw new common_1.InternalServerErrorException(`Storage problem: ${err1}`);
                    }
                    this.client.setBucketPolicy(this.bucket, publicReadPolicy_1.allowReadPolicy(this.bucket), err2 => {
                        if (err2 !== null)
                            throw new common_1.InternalServerErrorException(`Bucket policy problem: ${err2}`);
                    });
                });
            }
        });
    }
    put(file, name, size, _retries = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = `/${this.bucket}/${name}`;
            return new Promise((res, rej) => {
                this.client.putObject(this.bucket, name, file, (error) => {
                    if (error === null)
                        return res([filename, size]);
                    if (!error.code.includes('InternalError') ||
                        _retries === 0) {
                        this.logger.error('B2 non fixable error ');
                        return rej(error);
                    }
                    this.logger.warn('B2 returned error, try again. File name:', name);
                    helpers_1.wait(100).then(() => {
                        this.put(file, name, size, _retries - 1)
                            .then(() => res([filename, size]))
                            .catch(rej);
                    });
                });
            });
        });
    }
    delete(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                this.client.removeObject(this.bucket, file, err => {
                    if (err === null)
                        res();
                    if (err !== null)
                        rej(err);
                });
            });
        });
    }
    deleteWherePrefix(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const filenames = yield this.listFiles(prefix);
            return new Promise((res, rej) => {
                this.client.removeObjects(this.bucket, filenames, err => {
                    if (err === null)
                        res(filenames);
                    if (err !== null)
                        rej();
                });
            });
        });
    }
    listFiles(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => {
                const filenames = [];
                const filesStream = this.client.listObjectsV2(this.bucket, prefix);
                filesStream.on('data', filename => filenames.push(filename.name));
                filesStream.on('error', rej);
                filesStream.on('end', () => res(filenames));
            });
        });
    }
};
StorageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map