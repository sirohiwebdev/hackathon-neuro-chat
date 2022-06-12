"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryModel = void 0;
const BaseModel_1 = require("./BaseModel");
class QueryModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.collectionName = 'query';
    }
}
exports.QueryModel = QueryModel;
