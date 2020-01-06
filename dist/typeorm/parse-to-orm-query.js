"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const helpers_1 = require("../helpers");
function parseQuery(query) {
    const queryObject = helpers_1.convertToObject(query);
    const typeOrmQuery = {};
    Object.keys(queryObject).forEach(filter => {
        const value = queryObject[filter];
        const [name, comparison] = `${filter}`.split('__');
        if (filter.startsWith('pg'))
            return;
        switch (comparison) {
            case 'lt':
                typeOrmQuery[name] = typeorm_1.LessThan(value);
                break;
            case 'lte':
                typeOrmQuery[name] = typeorm_1.LessThanOrEqual(value);
                break;
            case 'gt':
                typeOrmQuery[name] = typeorm_1.MoreThan(value);
                break;
            case 'gte':
                typeOrmQuery[name] = typeorm_1.MoreThanOrEqual(value);
                break;
            case 'lk':
                typeOrmQuery[name] = typeorm_1.Like(`%${value}%`);
                break;
            case 'in':
                const arr = helpers_1.parseIfJson(value);
                if (Array.isArray(arr)) {
                    typeOrmQuery[name] = typeorm_1.In(value);
                }
                break;
            case 'btw':
                const btw = helpers_1.parseIfJson(value);
                if (Array.isArray(btw) && btw.length === 2) {
                    typeOrmQuery[name] = typeorm_1.Between(btw[0], btw[1]);
                }
                break;
            default:
                typeOrmQuery[name] = value instanceof typeorm_1.FindOperator ? value : typeorm_1.Equal(value);
                break;
        }
    });
    return typeOrmQuery;
}
exports.parseQuery = parseQuery;
//# sourceMappingURL=parse-to-orm-query.js.map