"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const tslib_1 = require("tslib");
const BaseModel_1 = require("./BaseModel");
const bcrypt = (0, tslib_1.__importStar)(require("bcrypt"));
const saltRounds = 10;
const mySecret = 'dafasfs0tereg4geger63e7wt78tg6re87wg';
class UserModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.generateSalt = () => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () { return bcrypt.genSalt(saltRounds); });
        this.hashPassword = (passwordPlainText) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield bcrypt.hash(passwordPlainText, yield this.generateSalt());
        });
        this.comparePassword = (passwordPlain, passwordHashed) => {
            return bcrypt.compare(passwordPlain, passwordHashed);
        };
        this.getByUsername = (username) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userCollection = yield this.collection;
            return userCollection.findOne({ username });
        });
        this.login = (username, password) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const isPresent = yield this.getByUsername(username);
            if (!isPresent)
                return {
                    success: false,
                    notFound: true,
                };
            const passwordMatched = yield this.comparePassword(password, isPresent.password);
            if (!passwordMatched)
                return {
                    success: false,
                    invalidPassword: true,
                };
            return {
                success: true,
                user: Object.assign(Object.assign({}, isPresent), { password: undefined }),
            };
        });
        this.signUp = (userData) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const isPresent = yield this.getByUsername(userData.username);
            if (isPresent) {
                return {
                    alreadyExists: true,
                };
            }
            userData.password = yield this.hashPassword(userData.password);
            return yield this.insert(userData);
        });
        this.collectionName = 'user';
    }
}
exports.UserModel = UserModel;
