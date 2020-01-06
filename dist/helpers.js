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
function removeEmptyItems(obj) {
    const validItems = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
            validItems[key] = obj[key];
        }
    });
    return validItems;
}
exports.removeEmptyItems = removeEmptyItems;
function wait(time) {
    return new Promise((res) => {
        setTimeout(res, time);
    });
}
exports.wait = wait;
function convertToObject(query) {
    if (typeof query === 'object')
        return Object.assign({}, query);
    if (query === null || query === undefined)
        return {};
    if (typeof query === 'string') {
        try {
            const parsed = JSON.parse(query);
            return Array.isArray(parsed) ? {} : parsed;
        }
        catch (error) {
            return {};
        }
    }
    return {};
}
exports.convertToObject = convertToObject;
function castArray(item) {
    if (Array.isArray(item)) {
        return item;
    }
    return [item];
}
exports.castArray = castArray;
function hasForbiddenKey(obj, key) {
    return Object.keys(obj).some(objectKey => {
        return objectKey.toLowerCase().includes(key.toLowerCase());
    });
}
exports.hasForbiddenKey = hasForbiddenKey;
function parseNumber(value) {
    if (typeof value === 'string') {
        const parsedValue = parseInt(value, 10);
        return Number.isNaN(parsedValue) ? undefined : parsedValue;
    }
    if (typeof value === 'number') {
        return Math.floor(value);
    }
    return undefined;
}
exports.parseNumber = parseNumber;
function getIntFromObject(obj, key) {
    if (obj && typeof obj === 'object') {
        const initValue = obj[key];
        const parsedValue = parseInt(initValue, 10);
        if (Number.isNaN(parsedValue))
            return undefined;
        return parsedValue;
    }
    return undefined;
}
exports.getIntFromObject = getIntFromObject;
function now() {
    return new Date();
}
exports.now = now;
function times(n, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        let success = false;
        let i = 0;
        while (!success && i < n) {
            i += 1;
            yield fn();
            try {
                success = true;
            }
            catch (error) { }
        }
    });
}
exports.times = times;
function parseIfJson(val) {
    try {
        if (typeof val === 'string') {
            return JSON.parse(val);
        }
        return val;
    }
    catch (error) {
        return undefined;
    }
}
exports.parseIfJson = parseIfJson;
//# sourceMappingURL=helpers.js.map