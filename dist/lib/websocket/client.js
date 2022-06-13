"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.socketInitializer = exports.socketIo = void 0;
const tslib_1 = require("tslib");
// @ts-ignore
const socket_io_client_1 = require("socket.io-client");
const socketInitializer = (user) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    exports.socketIo = (0, socket_io_client_1.io)(`ws://${window.location.host}`);
    exports.socketIo.on('connect', () => {
        console.log('Connected');
        exports.socketIo.emit('intro', { iAm: user.role, id: user.id });
    });
});
exports.socketInitializer = socketInitializer;
const disconnect = () => {
    exports.socketIo && exports.socketIo.disconnect();
};
exports.disconnect = disconnect;
