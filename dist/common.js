"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeColor = void 0;
const models_1 = require("./lib/models");
exports.badgeColor = {
    [models_1.QueryStatus.OPEN]: 'blue',
    [models_1.QueryStatus.PENDING]: 'yellow',
    [models_1.QueryStatus.RESOLVED]: 'green',
};
