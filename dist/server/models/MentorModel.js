"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorModel = void 0;
const BaseModel_1 = require("./BaseModel");
class MentorModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.collectionName = 'mentor';
    }
}
exports.MentorModel = MentorModel;
