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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSocketServer = void 0;
const ws_1 = require("ws");
const event_socket_1 = require("../event-socket");
class EventSocketServer {
    constructor(config, callback) {
        var _a;
        const port = (_a = config.port) !== null && _a !== void 0 ? _a : 8080;
        this.extractId = config.extractId;
        this.listeners = [];
        this.clients = [];
        this.wss = new ws_1.WebSocketServer(Object.assign(Object.assign({}, config), { port }), callback);
    }
    onHeaders(callback) {
        this.wss.on('headers', callback);
    }
    onConnection(callback) {
        this.wss.on('connection', (ws, req) => __awaiter(this, void 0, void 0, function* () {
            const id = yield this.extractId(req);
            const es = event_socket_1.EventSocket.from(id, ws);
            this.clients.push(es);
            this.listeners.forEach((listener) => {
                es.on(listener.eventName, (data) => listener.callback(es, data));
            });
            callback(es, req);
        }));
    }
    on(eventName, callback) {
        this.listeners.push({
            eventName,
            callback
        });
    }
    off(eventName) {
        this.clients.forEach(es => es.off(eventName));
        this.listeners = this.listeners.filter(listener => listener.eventName !== eventName);
    }
}
exports.EventSocketServer = EventSocketServer;
