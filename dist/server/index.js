"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
const httpserver_1 = require("./httpserver");
socket_1.io.on('connection', socket_1.connectionHandler);
const port = process.env.PORT || 8080;
httpserver_1.httpServer.listen(port, () => {
    console.log('Listening on Port', port);
});
