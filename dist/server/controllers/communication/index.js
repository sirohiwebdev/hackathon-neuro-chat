"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const CommunicationModel_1 = require("../../models/CommunicationModel");
const validateUser_1 = require("../../middlewares/validateUser");
const router = express_1.default.Router();
const communicationModel = new CommunicationModel_1.CommunicationModel();
router.get('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield communicationModel.get(id);
    if (!user)
        return res.status(404).end();
    return res.json(user);
}));
router.post('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const exists = yield communicationModel.get(id);
    if (!exists)
        return res.status(404).end();
    yield communicationModel.update(id, body);
    return res.status(200);
}));
// @ts-ignore
router.get('/', validateUser_1.validateUser, (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const _a = req.query, { limit, page } = _a, query = (0, tslib_1.__rest)(_a, ["limit", "page"]);
    const communications = yield communicationModel.find(query, Number(limit) || undefined, Number(page) || undefined);
    return res.json(communications);
}));
exports.default = router;
