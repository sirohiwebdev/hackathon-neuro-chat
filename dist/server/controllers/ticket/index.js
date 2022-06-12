"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const TicketModel_1 = require("../../models/TicketModel");
const validateUser_1 = require("../../middlewares/validateUser");
const models_1 = require("../../../lib/models");
const router = express_1.default.Router();
const ticketModel = new TicketModel_1.TicketModel();
router.get('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield ticketModel.get(id);
    if (!user)
        return res.status(404).end();
    return res.json(user);
}));
router.put('/:id', 
// @ts-ignore
validateUser_1.validateUser, (0, validateUser_1.validateRole)(models_1.UserRole.MENTOR), (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const updateResult = yield ticketModel.update(id, body);
    return res.json(updateResult);
}));
router.post('/', 
// @ts-ignore
validateUser_1.validateUser, (0, validateUser_1.validateRole)(models_1.UserRole.MENTOR), (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    const inserted = yield ticketModel.insert(Object.assign(Object.assign({}, body), { assignee: user.id, status: models_1.TicketStatus.PROGRESS }));
    return res.json(inserted);
}));
router.get('/', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const _a = req.query, { limit, page } = _a, query = (0, tslib_1.__rest)(_a, ["limit", "page"]);
    const tickets = yield ticketModel.find(query, Number(limit) || undefined, Number(page) || undefined);
    return res.json(tickets);
}));
exports.default = router;
