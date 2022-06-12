"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionHandler = exports.io = void 0;
const tslib_1 = require("tslib");
const socket_io_1 = require("socket.io");
const httpserver_1 = require("./httpserver");
const CommunicationModel_1 = require("./models/CommunicationModel");
exports.io = new socket_io_1.Server(httpserver_1.httpServer, {
    /* options */
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT'],
    },
});
const mentors = new Set();
const students = new Set();
const connectionHandler = (socket) => {
    console.log('a user connected', socket.data);
    socket.on('intro', (data) => {
        console.log(data, socket.id);
        (data === null || data === void 0 ? void 0 : data.iAm) && socket.join(data.iAm);
    });
    socket.on('chat', (query) => {
        socket.join(query);
    });
    socket.on('chat-message', (message) => {
        const communicationModel = new CommunicationModel_1.CommunicationModel();
        communicationModel.insert(message).then(console.log);
        socket.to(message.queryId).emit('message', message);
    });
    // socket.on('assign_query', (queryId: string) => {
    //   socket.to('mentor').emit('query_assign_req', queryId)
    // })
    socket.on('query-posted', (query) => {
        // socket.to(mentors)
    });
    socket.on('add-mentor', (mentorId) => {
        console.log(mentorId);
        mentors.add(mentorId);
    });
    socket.on('leave-mentor', (mentorId) => mentors.delete(mentorId));
    socket.on('add-student', (studentId) => students.add(studentId));
    socket.on('leave-student', (studentId) => students.delete(studentId));
    socket.on('message', (message) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        console.log('message', message);
        // allSockets
    }));
    //
};
exports.connectionHandler = connectionHandler;
