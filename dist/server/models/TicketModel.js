"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const BaseModel_1 = require("./BaseModel");
class TicketModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.collectionName = 'ticket';
    }
}
exports.TicketModel = TicketModel;
