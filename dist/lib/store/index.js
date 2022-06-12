"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStore = void 0;
const tslib_1 = require("tslib");
const toolkit_1 = require("@reduxjs/toolkit");
const reducer_1 = (0, tslib_1.__importDefault)(require("./reducer"));
function makeStore() {
    return (0, toolkit_1.configureStore)({
        reducer: reducer_1.default,
    });
}
exports.makeStore = makeStore;
const store = makeStore();
exports.default = store;
