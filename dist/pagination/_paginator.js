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
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const queryString = require("query-string");
const helpers_1 = require("../helpers");
const pagination_types_1 = require("./pagination.types");
const _generate_cursor_1 = require("./_generate-cursor");
const _parse_cursor_1 = require("./_parse-cursor");
class Paginator {
    constructor(repo) {
        this.repo = repo;
        this.limit = 12;
        this.orderDirection = 'DESC';
        this.orderBy = 'createdAt';
        this.direction = 'next';
        this.relations = [];
    }
    setOptions(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(params);
            if (errors.length > 0)
                throw new common_1.BadRequestException(errors);
            this.limit = params.limit || this.limit;
            this.orderDirection = params.order || 'DESC';
            this.cursor = params.cursor;
            this.requestQuery = params.where;
            this.relations = params.relations;
            this.currentUrl = params.currentUrl;
        });
    }
    execute(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let cursorQuery;
            if (this.cursor) {
                const cursor = new _parse_cursor_1.ParseCursor(this.cursor, this.orderDirection);
                cursorQuery = cursor.query;
                this.direction = cursor.direction;
            }
            else {
                cursorQuery = {};
            }
            if (this.direction === 'prev') {
                this.orderDirection = this.orderDirection === 'ASC' ? 'DESC' : 'ASC';
            }
            const whereQuery = filter || this.requestQuery;
            if (typeof whereQuery === 'string') {
                throw new common_1.BadRequestException('Filter is string');
            }
            let where = helpers_1.convertToObject(whereQuery);
            where = Object.assign(Object.assign({}, where), cursorQuery);
            const result = yield this.repo.find({
                where,
                order: { [this.orderBy]: this.orderDirection, id: this.orderDirection },
                take: this.limit + 1,
                relations: this.relations,
            });
            return this.parseResponse(result);
        });
    }
    parseResponse(result) {
        const endReached = this.limit >= result.length;
        const response = new pagination_types_1.PaginatorResponse();
        let isFirstPage = false;
        let isLastPage = false;
        let next;
        let previous;
        let nextUrl;
        let previousUrl;
        let lastUrl;
        let firstUrl;
        if (endReached) {
            if (this.direction === 'next') {
                isLastPage = true;
            }
            else {
                isFirstPage = true;
            }
        }
        else {
            result.pop();
        }
        if (this.cursor === undefined) {
            isFirstPage = true;
        }
        result = this.direction === 'next' ? result : result.reverse();
        if (!isLastPage && this.currentUrl) {
            const lastItem = result[result.length - 1];
            next = new _generate_cursor_1.GenerateCursor(lastItem, 'next', this.orderBy).cursor;
            const { query, url } = queryString.parseUrl(this.currentUrl);
            query[pagination_types_1.cursorField] = next;
            nextUrl = `${url}?${queryString.stringify(query)}`;
        }
        if (!isFirstPage && this.currentUrl) {
            const firstItem = result[0];
            previous = new _generate_cursor_1.GenerateCursor(firstItem, 'prev', this.orderBy).cursor;
            const { query, url } = queryString.parseUrl(this.currentUrl);
            query[pagination_types_1.cursorField] = previous;
            previousUrl = `${url}?${queryString.stringify(query)}`;
        }
        if (this.currentUrl) {
            const url = queryString.parseUrl(this.currentUrl);
            delete url.query[pagination_types_1.cursorField];
            firstUrl = `${url.url}?${queryString.stringify(url.query)}`;
        }
        response.pagination = {
            lastUrl,
            isLastPage,
            firstUrl,
            isFirstPage,
            previous,
            next,
            nextUrl,
            previousUrl,
            perPage: this.limit,
            amount: result.length,
        };
        response.data = result;
        return response;
    }
}
exports.Paginator = Paginator;
//# sourceMappingURL=_paginator.js.map