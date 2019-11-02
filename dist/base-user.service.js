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
const typeorm_1 = require("typeorm");
const base_service_1 = require("./base.service");
const storage_images_service_1 = require("./storage/storage-images.service");
const role_service_1 = require("./access-control/role/role.service");
const roles_entity_1 = require("./access-control/role/roles.entity");
let BaseUserService = class BaseUserService extends base_service_1.BaseService {
    constructor(repository, options) {
        super(repository);
        this.options = {
            useAvatar: true,
            useRoles: true,
        };
        if (options) {
            const { useAvatar, useRoles } = options;
            if (useAvatar !== undefined)
                this.options.useAvatar = useAvatar;
            if (useRoles !== undefined)
                this.options.useRoles = useRoles;
        }
    }
    createUser({ email, password, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.repository.findOne({ where: { email } });
            if (userExist)
                throw new common_1.BadRequestException('User exists');
            try {
                const user = this.repository.create();
                user.email = email;
                user.name = name;
                user.password = password;
                user.generateSecureToken();
                const savedUser = yield this.repository.save(user);
                if (this.options.useRoles) {
                    const defaultRole = new roles_entity_1.Role();
                    defaultRole.domain = savedUser.id;
                    defaultRole.name = 'user';
                    defaultRole.userId = savedUser.id;
                    yield this.roleService.create(defaultRole);
                }
                return savedUser;
            }
            catch (error) {
                this.logger.error(error);
                throw new common_1.InternalServerErrorException();
            }
        });
    }
    findForLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({ email });
            if (!(yield user.checkPassword(password))) {
                throw new common_1.BadRequestException('Invalid parameters.');
            }
            return user;
        });
    }
    changePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, oldPassword, newPassword } = data;
            const user = yield this.findForLogin(email, oldPassword);
            user.password = newPassword;
            return this.mutate(user, {
                user,
                domain: user.id,
                reason: 'Change password.',
            });
        });
    }
    deleteAccount({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findForLogin(email, password);
            return this.delete(user, { user });
        });
    }
    changeAvatar(user, newAvatar) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.useAvatar) {
                this.logger.error('Avatar is not used.', '', 'UserModule');
                throw new common_1.InternalServerErrorException();
            }
            if (user.avatar) {
                yield this.removeAvatar(user);
            }
            const name = `avatars/${user.id}`;
            const [sizes, prefix] = yield this.storageImagesService.addImage(newAvatar);
            user.avatar = sizes;
            const updatedUser = yield this.mutate(user, {
                user,
                reason: 'Add avatar',
                domain: user.id,
            });
            return updatedUser;
        });
    }
    removeAvatar(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.useAvatar) {
                this.logger.error('Avatar is not used.', '', 'UserModule');
                throw new common_1.InternalServerErrorException();
            }
            if (!user.avatar)
                return user;
            yield this.storageImagesService.removeImageBySizes(user.avatar);
            delete user.avatar;
            const updatedUser = yield this.mutate(user, {
                user,
                reason: 'Remove avatar',
                domain: user.id,
            });
            return updatedUser;
        });
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", storage_images_service_1.StorageImagesService)
], BaseUserService.prototype, "storageImagesService", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", role_service_1.RoleService)
], BaseUserService.prototype, "roleService", void 0);
BaseUserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object])
], BaseUserService);
exports.BaseUserService = BaseUserService;
//# sourceMappingURL=base-user.service.js.map