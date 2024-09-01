"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListener = void 0;
class EventListener {
    constructor(listeners = []) {
        this.listeners = listeners;
    }
    /**
     * Register a listener for a 'message' with an event type
     *
     * @param eventName
     * @param callback
     */
    on(eventName, callback) {
        this.listeners.push({
            eventName,
            callback
        });
    }
    /**
     * Remove all listeners for a 'message' with an event type
     */
    off(eventName) {
        this.listeners = this.listeners.filter((listener) => listener.eventName !== eventName);
    }
}
exports.EventListener = EventListener;
