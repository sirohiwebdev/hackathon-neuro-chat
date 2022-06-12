"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.verify = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const { SECRET } = process.env;
const verify = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, SECRET);
    return payload;
};
exports.verify = verify;
const sign = (payload) => {
    return jsonwebtoken_1.default.sign(JSON.stringify(payload), SECRET);
};
exports.sign = sign;
