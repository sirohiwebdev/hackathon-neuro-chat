"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const UserModel_1 = require("../../models/UserModel");
const router = express_1.default.Router();
const userModel = new UserModel_1.UserModel();
router.get('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield userModel.get(id);
    if (!user)
        return res.status(404).end();
    return res.json(user);
}));
router.post('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const exists = yield userModel.get(id);
    if (!exists)
        return res.status(404).end();
    yield userModel.update(id, body);
    return res.status(200);
}));
router.post('/', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    console.log('Creating user');
    const { body } = req;
    const user = yield userModel.insert(body);
    return res.json(user);
}));
router.get('/', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const _a = req.query, { limit, page } = _a, query = (0, tslib_1.__rest)(_a, ["limit", "page"]);
    const user = yield userModel.find(query, Number(limit) || undefined, Number(page) || undefined);
    return res.json(user);
}));
exports.default = router;
