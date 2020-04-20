"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const sqlstring_1 = require("sqlstring");
class ParseCursor {
    constructor(cursor, order = 'DESC', table) {
        this.cursor = cursor;
        this.order = order;
        this.table = table;
        this.validator = new class_validator_1.Validator();
        const decodedCursor = this.cursor;
        const [id, columnName, columnValue, direction] = decodedCursor.split(';');
        if (this.validator.isEmpty(columnValue)) {
            throw new common_1.BadRequestException('Invalid column');
        }
        if (this.validator.isNotIn(direction, ['prev', 'next'])) {
            throw new common_1.BadRequestException('Bad direction');
        }
        this.id = id;
        this.columnName = columnName;
        this.columnValue = columnValue;
        this.direction = direction;
        this.convertValueToCorrectType();
        this.query = this.toTypeOrmQuery();
    }
    toTypeOrmQuery() {
        if (!this.validator.isUUID(this.id)) {
            throw new common_1.BadRequestException("Cursor's Id part not UUID");
        }
        let sign = this.order === 'ASC' ? '>' : '<';
        if (this.direction === 'prev') {
            sign = sign === '>' ? '<' : '>';
        }
        const valueIsDiff = (column) => `${column} ${sign} ${sqlstring_1.escape(this.columnValue)}`;
        const valueIsEqual = (column) => `${column} = ${sqlstring_1.escape(this.columnValue)}`;
        return {
            [this.columnName]: typeorm_1.Raw(alias => {
                if (!alias) {
                    throw new common_1.InternalServerErrorException('Column name empty');
                }
                const query = `( ${valueIsDiff(alias)} OR ( ${valueIsEqual(alias)} AND ${this.table}.id ${sign} ${sqlstring_1.escape(this.id)}) )`;
                return query;
            }),
        };
    }
    convertValueToCorrectType() {
        let converted;
        if (this.columnName.endsWith('At')) {
            if (this.validator.isNumberString(this.columnValue)) {
                converted = new Date(Number(this.columnValue));
            }
            else {
                converted = new Date(this.columnValue);
            }
        }
        else {
            converted = this.columnValue;
        }
        this.columnValue = converted;
    }
}
exports.ParseCursor = ParseCursor;
//# sourceMappingURL=_parse-cursor.js.map