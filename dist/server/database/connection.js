"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryCollection = exports.getMentorCollection = exports.getTicketCollection = exports.getCommunicationCollection = exports.getUserCollection = exports.getCollection = exports.getDB = void 0;
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
let client;
let db;
const { MONGODB_URL, DB_NAME } = process.env;
const getDB = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    if (client && db)
        return { db, client };
    console.log('Connecting to DB');
    const mongoClient = new mongodb_1.MongoClient(MONGODB_URL, {});
    yield mongoClient.connect();
    console.log('Connected');
    client = mongoClient;
    db = client.db(DB_NAME);
    return {
        client,
        db,
    };
});
exports.getDB = getDB;
const getCollection = (collectionName) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { db } = yield (0, exports.getDB)();
    return db.collection(collectionName);
});
exports.getCollection = getCollection;
exports.getUserCollection = (0, exports.getCollection)('user');
exports.getCommunicationCollection = (0, exports.getCollection)('communication');
exports.getTicketCollection = (0, exports.getCollection)('ticket');
exports.getMentorCollection = (0, exports.getCollection)('mentor');
exports.getQueryCollection = (0, exports.getCollection)('query');
