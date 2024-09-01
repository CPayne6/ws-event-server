"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const _1 = require("./");
const ws = new ws_1.WebSocket(null);
const e = new _1.EventSocket(ws);
e.on('test', (data) => {
    data;
});
