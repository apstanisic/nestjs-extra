"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const pagination_options_1 = require("./pagination-options");
async function convert(query, url) {
    const options = pagination_options_1.PaginationParams.fromRequest(query);
    options.currentUrl = url;
    const errors = await class_validator_1.validate(options);
    if (errors.length > 0)
        throw new common_1.BadRequestException(errors);
    return options;
}
exports.GetPagination = common_1.createParamDecorator(async (data, ctx) => {
    const { query, originalUrl } = ctx.switchToHttp().getRequest();
    return convert(query, originalUrl);
});
//# sourceMappingURL=pagination.decorator.js.map