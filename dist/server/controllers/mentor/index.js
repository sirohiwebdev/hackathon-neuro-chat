"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const MentorModel_1 = require("../../models/MentorModel");
const router = express_1.default.Router();
const mentorModel = new MentorModel_1.MentorModel();
router.get('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield mentorModel.get(id);
    if (!user)
        return res.status(404).end();
    return res.json(user);
}));
router.post('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const exists = yield mentorModel.get(id);
    if (!exists)
        return res.status(404).end();
    yield mentorModel.update(id, body);
    return res.status(200);
}));
exports.default = router;
