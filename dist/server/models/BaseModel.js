"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const tslib_1 = require("tslib");
const connection_1 = require("../database/connection");
const uuid_1 = require("uuid");
class BaseModel {
    constructor() {
        this.insert = (body) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const dbCollection = yield this.collection;
            const id = (0, uuid_1.v4)();
            const data = yield dbCollection.insertOne(Object.assign(Object.assign({ id }, body), { created_at: Date.now().toString() }));
            return { id };
        });
        this.get = (id) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const dbCollection = yield this.collection;
            // @ts-ignore
            return dbCollection.findOne({ id });
        });
        this.update = (id, body) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const dbCollection = yield this.collection;
            return dbCollection.updateOne({ id }, { $set: body });
        });
        this.remove = (id) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const dbCollection = yield this.collection;
            return dbCollection.deleteOne({ id });
        });
        this.find = (options, limit = 100, offset = 0) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (offset < 0) {
                offset = 0;
            }
            const dbCollection = yield this.collection;
            const found = yield dbCollection.find(options, {
                limit,
                skip: limit * offset,
                sort: {
                    timestamp: -1,
                },
            });
            return found.toArray();
        });
        this.collectionName = 'base';
    }
    get collection() {
        return (0, connection_1.getCollection)(this.collectionName);
    }
}
exports.BaseModel = BaseModel;
