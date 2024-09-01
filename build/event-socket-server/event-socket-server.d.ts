/// <reference types="node" />
import { ServerOptions } from 'ws';
import { IncomingMessage } from 'http';
import type { EventMap } from '../event.types';
import { EventSocket } from '../event-socket';
export interface EventSocketServerConfig extends ServerOptions {
}
export declare class EventSocketServer<T extends string = string, K extends EventMap<T> = any> {
    private wss;
    constructor(config: EventSocketServerConfig, callback?: () => void);
    onHeaders(callback: (headers: string[], req: IncomingMessage) => void): void;
    onConnection(callback: (es: EventSocket<T, K>, req: IncomingMessage) => void): void;
}
