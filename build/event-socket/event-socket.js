"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSocket = void 0;
const utils_1 = require("../utils");
const ws_1 = require("ws");
/**
 * Wrapper for WebSocket with dispatch functionality
 */
class EventSocket {
    constructor(ws) {
        this.ws = ws;
    }
    static new(address, options) {
        const ws = new ws_1.WebSocket(address, options);
        return new EventSocket(ws);
    }
    static from(ws) {
        return new EventSocket(ws);
    }
    /**
     * Register a listener for a 'message' with an event type
     *
     * @param eventName
     * @param callback
     */
    onDispatch(eventName, callback) {
        this.ws.on('message', (rawData) => {
            try {
                const [event, data] = (0, utils_1.extractDispatch)(rawData);
                if (event === eventName) {
                    callback(data);
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    /**
     * Format a dispatch and send as a 'message'
     * @param eventName
     * @param data
     */
    dispatch(eventName, data) {
        this.ws.send(JSON.stringify([eventName, data]));
    }
}
exports.EventSocket = EventSocket;
