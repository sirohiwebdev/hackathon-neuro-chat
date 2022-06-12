"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = void 0;
const react_1 = require("@chakra-ui/react");
const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },
};
exports.theme = (0, react_1.extendTheme)({ colors });
