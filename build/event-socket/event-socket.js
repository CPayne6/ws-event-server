"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSocket = void 0;
const utils_1 = require("../utils");
const event_listener_1 = require("../event-listener");
const ws_1 = require("ws");
/**
 * Wrapper for WebSocket with dispatch functionality
 */
class EventSocket extends event_listener_1.EventListener {
    constructor({ ws, listeners = [], id }) {
        super(listeners);
        this.id = id;
        this.ws = ws;
        ws.on('message', (rawData) => {
            const [event, data] = (0, utils_1.extractDispatch)(rawData);
            for (const listener of this.listeners) {
                const { eventName, callback } = listener;
                try {
                    if (event === eventName) {
                        callback(data);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    }
    static new(id, address, options) {
        const ws = new ws_1.WebSocket(address, options);
        return new EventSocket({ ws, id });
    }
    static from(id, ws) {
        return new EventSocket({ ws, id });
    }
    /**
     * Format a dispatch and send as a 'message'
     * @param eventName
     * @param data
     */
    dispatch(eventName, data) {
        this.ws.send(JSON.stringify([eventName, data]));
    }
    /**
     * Terminate the socket
     */
    terminate() {
        this.ws.terminate();
    }
}
exports.EventSocket = EventSocket;
