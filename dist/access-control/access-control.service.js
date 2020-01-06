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
const casbin_1 = require("casbin");
const consts_1 = require("../consts");
const casbin_valid_domain_1 = require("./casbin-valid-domain");
let AccessControlService = class AccessControlService {
    constructor(casbinModelText, casbinPolicies) {
        const casbinModel = casbin_1.newModel();
        casbinModel.loadModelFromText(casbinModelText);
        const stringAdapter = new casbin_1.StringAdapter(casbinPolicies);
        casbin_1.newEnforcer(casbinModel, stringAdapter).then(enforcer => {
            this.enforcer = enforcer;
            this.enforcer.addFunction('validDomain', casbin_valid_domain_1.casbinValidDomain);
        });
    }
    isAllowed(roles, resourcePath, action = 'write') {
        return __awaiter(this, void 0, void 0, function* () {
            const isAllowedPromises = roles.map(role => this.enforcer.enforce(role.name, role.domain, resourcePath, action));
            const rolesResponses = yield Promise.all(isAllowedPromises);
            return rolesResponses.some(isAllowed => isAllowed);
        });
    }
};
AccessControlService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(consts_1.AC_MODEL)),
    __param(1, common_1.Inject(consts_1.AC_POLICIES)),
    __metadata("design:paramtypes", [String, String])
], AccessControlService);
exports.AccessControlService = AccessControlService;
//# sourceMappingURL=access-control.service.js.map