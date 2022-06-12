"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const pages_1 = require("./pages");
const AuthenticatedRoute_1 = require("./components/Auth/AuthenticatedRoute");
const Login_1 = __importDefault(require("./pages/Login"));
const QueryDetails_1 = __importDefault(require("./pages/QueryDetails"));
const HelpStudents_1 = __importDefault(require("./pages/HelpStudents"));
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path={'/'} element={<AuthenticatedRoute_1.AuthenticatedRoute>
              <pages_1.HomePage />
            </AuthenticatedRoute_1.AuthenticatedRoute>}/>
        <react_router_dom_1.Route path={'/login'} element={<AuthenticatedRoute_1.AuthenticatedRoute inverse redirectTo={'/'}>
              <Login_1.default />
            </AuthenticatedRoute_1.AuthenticatedRoute>}/>

        <react_router_dom_1.Route path={'/query/:queryId'} element={<AuthenticatedRoute_1.AuthenticatedRoute>
              <QueryDetails_1.default />
            </AuthenticatedRoute_1.AuthenticatedRoute>}/>

        <react_router_dom_1.Route path={'/resolve/:queryId'} element={<AuthenticatedRoute_1.AuthenticatedRoute>
              <HelpStudents_1.default />
            </AuthenticatedRoute_1.AuthenticatedRoute>}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
