/// <reference types="node" />
import { ClientRequestArgs } from 'http';
import { EventMap, Listener } from '../event.types';
import { EventListener } from '../event-listener';
import { ClientOptions, WebSocket } from 'ws';
interface EventSocketConfig {
    ws: WebSocket;
    listeners?: Listener[];
    id: string;
}
/**
 * Wrapper for WebSocket with dispatch functionality
 */
export declare class EventSocket<T extends string, K extends EventMap<T> = any> extends EventListener<T, K> {
    ws: WebSocket;
    id: string;
    constructor({ ws, listeners, id }: EventSocketConfig);
    static new<T extends string = string, K extends EventMap<T> = any>(id: string, address: string, options?: ClientOptions | ClientRequestArgs): EventSocket<T, K>;
    static from<T extends string = string, K extends EventMap<T> = any>(id: string, ws: WebSocket): EventSocket<T, K>;
    /**
     * Format a dispatch and send as a 'message'
     * @param eventName
     * @param data
     */
    dispatch<J extends T>(eventName: J, data?: K[J]): void;
    /**
     * Terminate the socket
     */
    terminate(): void;
}
export {};
