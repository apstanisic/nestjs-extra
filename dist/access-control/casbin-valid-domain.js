"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function casbinValidDomain(domain, resourcePath) {
    if (domain === '*' || domain === '/*')
        return true;
    return resourcePath.includes(domain);
}
exports.casbinValidDomain = casbinValidDomain;
//# sourceMappingURL=casbin-valid-domain.js.map