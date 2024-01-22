"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSocketServer = void 0;
const ws_1 = require("ws");
const event_socket_1 = require("../event-socket");
class EventSocketServer {
    constructor(config, callback) {
        var _a;
        this.eventMap = {};
        const port = (_a = config.port) !== null && _a !== void 0 ? _a : 8080;
        this.wss = new ws_1.WebSocketServer(Object.assign(Object.assign({}, config), { port }), callback);
    }
    onHeaders(callback) {
        this.wss.on('headers', callback);
    }
    onConnection(callback) {
        this.wss.on('connection', (ws, req) => callback(event_socket_1.EventSocket.from(ws), req));
    }
}
exports.EventSocketServer = EventSocketServer;
