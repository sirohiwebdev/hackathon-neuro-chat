"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.getTickets = exports.updateTicket = exports.getTicketById = exports.createTicket = exports.getCommunicationsByQueryId = exports.updateQuery = exports.addQuery = exports.getQueryById = exports.listQueriesByMe = exports.listQueries = exports.login = exports.put = exports.post = exports.get = void 0;
const axios_1 = __importDefault(require("axios"));
const AuthProvider_1 = require("../components/Auth/AuthProvider");
const basePath = 'http://localhost:8080';
const callAxios = (call) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const response = yield call;
        return response.data;
    }
    catch (e) {
        let error = e;
        if (error.isAxiosError) {
            return Promise.reject(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data));
        }
        return Promise.reject(error.message);
    }
});
const getHeaders = (auth) => {
    let headers = {
        'Content-Type': 'application/json',
    };
    if (auth) {
        headers['Authorization'] = `Bearer ${AuthProvider_1.authStorage.get()}`;
    }
    return headers;
};
const get = (url, options) => {
    return callAxios(axios_1.default.get(url, {
        params: options.params,
        headers: getHeaders(options.auth),
    }));
};
exports.get = get;
const post = (url, options) => {
    return callAxios(axios_1.default.post(url, options.body, {
        params: options.params,
        headers: getHeaders(options.auth),
    }));
};
exports.post = post;
const put = (url, options) => {
    return callAxios(axios_1.default.put(url, options.body, {
        params: options.params,
        headers: getHeaders(options.auth),
    }));
};
exports.put = put;
const login = (params) => (0, exports.post)(`${basePath}/auth/login`, {
    body: params,
});
exports.login = login;
const listQueries = (params) => (0, exports.post)(`${basePath}/api/query`, {
    auth: true,
    params: params,
    body: params,
});
exports.listQueries = listQueries;
const listQueriesByMe = (params) => (0, exports.get)(`${basePath}/api/query/me`, {
    auth: true,
    params: params,
});
exports.listQueriesByMe = listQueriesByMe;
const getQueryById = (id) => (0, exports.get)(`${basePath}/api/query/${id}`, {
    auth: true,
});
exports.getQueryById = getQueryById;
const addQuery = (params) => (0, exports.post)(`${basePath}/api/query`, {
    auth: true,
    body: params,
});
exports.addQuery = addQuery;
const updateQuery = ({ id, params, }) => (0, exports.put)(`${basePath}/api/query/${id}`, {
    auth: true,
    body: params,
});
exports.updateQuery = updateQuery;
const getCommunicationsByQueryId = (queryId) => (0, exports.get)(`${basePath}/api/communications`, {
    auth: true,
    params: {
        queryId,
    },
});
exports.getCommunicationsByQueryId = getCommunicationsByQueryId;
const createTicket = (queryId) => (0, exports.post)(`${basePath}/api/tickets`, {
    auth: true,
    body: {
        queryId,
    },
});
exports.createTicket = createTicket;
const getTicketById = (id) => (0, exports.get)(`${basePath}/api/tickets/${id}`, {
    auth: true,
});
exports.getTicketById = getTicketById;
const updateTicket = ({ id, params, }) => (0, exports.put)(`${basePath}/api/tickets/${id}`, {
    auth: true,
    body: params,
});
exports.updateTicket = updateTicket;
const getTickets = (queryId) => (0, exports.get)(`${basePath}/api/tickets`, {
    auth: true,
    params: {
        queryId,
    },
});
exports.getTickets = getTickets;
const listUsers = (params) => (0, exports.get)(`${basePath}/api/users`, {
    auth: true,
    params,
});
exports.listUsers = listUsers;
