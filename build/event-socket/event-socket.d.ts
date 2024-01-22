/// <reference types="node" />
import { ClientRequestArgs } from 'http';
import { ClientOptions, WebSocket } from 'ws';
/**
 * Wrapper for WebSocket with dispatch functionality
 */
export declare class EventSocket<T extends string = string> {
    ws: WebSocket;
    constructor(ws: WebSocket);
    static new<T extends string = string>(address: string, options?: ClientOptions | ClientRequestArgs): EventSocket<T>;
    static from<T extends string = string>(ws: WebSocket): EventSocket<T>;
    /**
     * Register a listener for a 'message' with an event type
     *
     * @param eventName
     * @param callback
     */
    onDispatch<K = any>(eventName: T, callback: (data: K) => void): void;
    /**
     * Format a dispatch and send as a 'message'
     * @param eventName
     * @param data
     */
    dispatch(eventName: T, data?: any): void;
}
