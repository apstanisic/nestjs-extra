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
const _paginator_1 = require("./_paginator");
function paginate({ repository, options }) {
    return __awaiter(this, void 0, void 0, function* () {
        const paginator = new _paginator_1.Paginator(repository);
        yield paginator.setOptions(options);
        return paginator.execute();
    });
}
exports.paginate = paginate;
//# sourceMappingURL=_paginate.helper.js.map