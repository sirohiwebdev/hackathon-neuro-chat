"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationModel = void 0;
const BaseModel_1 = require("./BaseModel");
class CommunicationModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.collectionName = 'communication';
    }
}
exports.CommunicationModel = CommunicationModel;
