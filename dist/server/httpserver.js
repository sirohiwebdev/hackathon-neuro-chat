"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const http_1 = require("http");
const app_1 = require("./app");
exports.httpServer = (0, http_1.createServer)(app_1.app);
