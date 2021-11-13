"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromRequest = exports.getBodyData = void 0;
function getBodyData(req) {
    const { body } = req;
    if (!Object.keys(body).length) {
        return undefined;
    }
    return body;
}
exports.getBodyData = getBodyData;
const getIdFromRequest = (req) => {
    return req.params.id;
};
exports.getIdFromRequest = getIdFromRequest;
