"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = exports.generateError = void 0;
const generateError = (statusCode, status) => {
    return { statusCode, status };
};
exports.generateError = generateError;
const isError = (obj) => {
    if (!obj) {
        return false;
    }
    const keys = Object.keys(obj);
    return keys.length === 2 && keys.includes('statusCode') && keys.includes('status');
};
exports.isError = isError;
