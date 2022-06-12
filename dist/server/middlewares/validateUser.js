"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = exports.validateUser = void 0;
const tslib_1 = require("tslib");
const jwt_1 = require("../services/jwt");
const validateUser = (req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(400).json({ message: 'No auth headers present' });
    }
    const [c, token] = req.headers.authorization.split(' ');
    try {
        // @ts-ignore
        req.user = yield (0, jwt_1.verify)(token);
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});
exports.validateUser = validateUser;
const validateRole = (role) => (req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user || user.role !== role) {
        return res.status(403);
    }
    next();
});
exports.validateRole = validateRole;
