"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const QueryModel_1 = require("../../models/QueryModel");
const express_validator_1 = require("express-validator");
const validateUser_1 = require("../../middlewares/validateUser");
const models_1 = require("../../../lib/models");
const validateReq_1 = require("../../middlewares/validateReq");
const socket_1 = require("../../socket");
const UserModel_1 = require("../../models/UserModel");
const router = express_1.default.Router();
const queryModel = new QueryModel_1.QueryModel();
// @ts-ignore
router.get('/me', validateUser_1.validateUser, (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const _a = req.query, { withAssignee, page, limit } = _a, query = (0, tslib_1.__rest)(_a, ["withAssignee", "page", "limit"]);
    const { user } = req;
    const q = yield queryModel.find(Object.assign(Object.assign({}, query), { from: user.id }), Number(limit) || undefined, Number(page) || undefined);
    console.log(q.length);
    const responseWithAssignee = [];
    if (withAssignee) {
        const userModel = new UserModel_1.UserModel();
        for (const eQ of q) {
            if (eQ.assignee) {
                eQ.assignee = (yield userModel.get(eQ.assignee));
            }
            eQ.from = user;
            responseWithAssignee.push(eQ);
        }
    }
    return res.json(responseWithAssignee);
}));
router.post('/new', 
// @ts-ignore
validateUser_1.validateUser, (0, validateUser_1.validateRole)(models_1.UserRole.STUDENT), (0, express_validator_1.body)(['title', 'description']).exists(), validateReq_1.validateReq, (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { body, user } = req;
    const insert = yield queryModel.insert(Object.assign(Object.assign({}, body), { from: user.id, status: models_1.QueryStatus.OPEN }));
    console.log('Created', insert.id);
    // Send broadcast to all mentors connected
    socket_1.io.sockets.to('mentor').emit('query_assign_req', insert.id);
    return res.json(insert);
}));
router.get('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = yield queryModel.get(id);
    const userModel = new UserModel_1.UserModel();
    if (!query)
        return res.status(404).end();
    const user = yield userModel.get(query.from);
    const assignee = yield userModel.get(query.assignee);
    if (user) {
        // @ts-ignore
        delete user['password'];
    }
    if (assignee) {
        // @ts-ignore
        delete assignee['password'];
    }
    return res.json(Object.assign(Object.assign({}, query), { user,
        assignee }));
}));
router.post('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const exists = yield queryModel.get(id);
    if (!exists)
        return res.status(404).end();
    yield queryModel.update(id, body);
    return res.status(200);
}));
router.put('/:id', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const data = yield queryModel.update(id, body);
    return res.status(200).json(data);
}));
router.post('/', (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { withAssignee, page, limit } = req.query;
    const { body } = req;
    console.log('Query', body);
    const q = yield queryModel.find(body, Number(limit) || undefined, Number(page) || undefined);
    return res.json(q);
}));
exports.default = router;
