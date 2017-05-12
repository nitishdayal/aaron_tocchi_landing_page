"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var express = require("express");
var body_parser_1 = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var sassMiddleware = require("node-sass-middleware");
var index = require("./routes/index");
var users = require("./routes/users");
var ExpressServer = (function () {
    function ExpressServer(_app, _PORT) {
        if (_app === void 0) { _app = express(); }
        if (_PORT === void 0) { _PORT = process.env.PORT || 3000; }
        var _this = this;
        this._app = _app;
        this._PORT = _PORT;
        this.startServer = function () {
            _this._app.listen(_this._PORT, function () {
                console.log("Express server listening on port " + _this._PORT);
            });
        };
        this.setViewEngine().setMiddleWare().setRoutes();
    }
    ExpressServer.prototype.setViewEngine = function () {
        this._app.set('view', path.join(__dirname, 'views'));
        this._app.set('view engine', 'pug');
        return this;
    };
    ExpressServer.prototype.setMiddleWare = function () {
        this._app.use(cors())
            .use(body_parser_1.json())
            .use(body_parser_1.urlencoded({ extended: false }))
            .use(cookieParser)
            .use(sassMiddleware({
            src: path.join(__dirname, "public"),
            dest: path.join(__dirname, "public"),
            indentedSyntax: false,
            sourceMap: true
        }))
            .use(express.static(path.join(__dirname, "public")));
        return this;
    };
    ExpressServer.prototype.setRoutes = function () {
        this._app.use('/', index);
        this._app.use('/users', users);
        return this;
    };
    return ExpressServer;
}());
var app = new ExpressServer();
module.exports = app._app;
//# sourceMappingURL=app.js.map