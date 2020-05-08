"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _paginator_1 = require("./_paginator");
async function paginate({ repository, options }) {
    const paginator = new _paginator_1.Paginator(repository);
    await paginator.setOptions(options);
    return paginator.execute();
}
exports.paginate = paginate;
//# sourceMappingURL=_paginate.helper.js.map