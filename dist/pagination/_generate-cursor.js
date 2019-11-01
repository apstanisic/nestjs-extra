"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class GenerateCursor {
    constructor(entity, direction, column = 'createdAt') {
        this.entity = entity;
        this.direction = direction;
        this.column = column;
        if (this.entity.id === undefined)
            throw new common_1.BadRequestException('No id');
        const value = this.getColumnValueFromEntity();
        this.cursor = `${this.entity.id};${this.column};${value};${this.direction}`;
    }
    getColumnValueFromEntity() {
        const value = this.entity[this.column];
        if (value === undefined) {
            throw new common_1.BadRequestException('Column either does not exist or is nullable');
        }
        if (value instanceof Date) {
            return value.getTime();
        }
        return value;
    }
}
exports.GenerateCursor = GenerateCursor;
//# sourceMappingURL=_generate-cursor.js.map