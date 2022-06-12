"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSelector = exports.authSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const auth_1 = require("../thunks/auth");
const initialState = {
    pending: false,
    data: {
        token: '',
    },
    error: false,
};
exports.authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(auth_1.getToken.pending, (state) => {
            state.pending = true;
        })
            .addCase(auth_1.getToken.fulfilled, (state, { payload }) => {
            // When the API call is successful, and we get some data,the data becomes the `fulfilled` action payload
            state.pending = false;
            state.data = { token: payload };
        })
            .addCase(auth_1.getToken.rejected, (state) => {
            state.pending = false;
            state.error = true;
        });
    },
});
const authSelector = (state) => state.auth;
exports.authSelector = authSelector;
exports.default = exports.authSlice.reducer;
