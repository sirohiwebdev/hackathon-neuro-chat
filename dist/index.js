"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const AuthProvider_1 = require("./components/Auth/AuthProvider");
const react_query_1 = require("react-query");
const react_2 = require("@chakra-ui/react");
const theme_1 = require("./lib/theme/theme");
const root = client_1.default.createRoot(document.getElementById('root'));
const queryClient = new react_query_1.QueryClient();
root.render(<react_1.default.StrictMode>
      <react_query_1.QueryClientProvider client={queryClient}>
          <react_2.ChakraProvider theme={theme_1.theme}>

      <AuthProvider_1.AuthProvider>
        <App_1.default />
    </AuthProvider_1.AuthProvider>
          </react_2.ChakraProvider>

      </react_query_1.QueryClientProvider>

  </react_1.default.StrictMode>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
