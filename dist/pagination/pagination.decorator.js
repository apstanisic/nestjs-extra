"use strict";
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
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const pagination_options_1 = require("./pagination-options");
function convert(query, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = pagination_options_1.PaginationParams.fromRequest(query);
        options.currentUrl = url;
        const errors = yield class_validator_1.validate(options);
        if (errors.length > 0)
            throw new common_1.BadRequestException(errors);
        return options;
    });
}
exports.GetPagination = common_1.createParamDecorator((data, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, originalUrl } = req;
    return convert(query, originalUrl);
}));
exports.GqlPagination = common_1.createParamDecorator((data, [root, args, ctx, info]) => convert(ctx.req.query));
//# sourceMappingURL=pagination.decorator.js.map