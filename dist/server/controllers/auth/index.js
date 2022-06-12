"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const express_validator_1 = require("express-validator");
const UserModel_1 = require("../../models/UserModel");
const validateReq_1 = require("../../middlewares/validateReq");
const jwt_1 = require("../../services/jwt");
exports.authRouter = express_1.default.Router();
const userModel = new UserModel_1.UserModel();
exports.authRouter.post('/login', (0, express_validator_1.body)(['username', 'password']).exists(), validateReq_1.validateReq, (req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { body } = req;
    const loggedUser = yield userModel.login(body.username, body.password);
    if (!loggedUser.success) {
        return res.status(loggedUser.notFound ? 404 : 401).json({
            message: loggedUser.notFound ? 'User not found' : 'Invalid password',
        });
    }
    const token = (0, jwt_1.sign)(loggedUser.user);
    return res.json({ token });
}));
exports.authRouter.post('/signin', (0, express_validator_1.body)(['username', 'password', 'role', 'name']).exists(), validateReq_1.validateReq, (req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { body } = req;
    const register = yield userModel.signUp(body);
    if ('alreadyExists' in register && register.alreadyExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    return res.json(register);
}));
