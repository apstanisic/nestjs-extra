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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class LoginUserDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(8, 50),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
exports.LoginUserDto = LoginUserDto;
class OnlyPasswordDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(8, 50),
    __metadata("design:type", String)
], OnlyPasswordDto.prototype, "password", void 0);
exports.OnlyPasswordDto = OnlyPasswordDto;
class ResetPasswordDto {
}
__decorate([
    class_validator_1.Length(8, 50),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
exports.ResetPasswordDto = ResetPasswordDto;
class RegisterUserDto extends LoginUserDto {
}
__decorate([
    class_validator_1.Length(2, 100),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "name", void 0);
exports.RegisterUserDto = RegisterUserDto;
class UpdatePasswordDto {
}
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    class_validator_1.Length(8, 50),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
exports.UpdatePasswordDto = UpdatePasswordDto;
class ChangeEmailDto {
}
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], ChangeEmailDto.prototype, "newEmail", void 0);
__decorate([
    class_validator_1.Length(8, 50),
    __metadata("design:type", String)
], ChangeEmailDto.prototype, "password", void 0);
exports.ChangeEmailDto = ChangeEmailDto;
class SignInResponse {
}
exports.SignInResponse = SignInResponse;
//# sourceMappingURL=auth.dto.js.map