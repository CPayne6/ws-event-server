/// <reference types="node" />
import { ServerOptions } from 'ws';
import { IncomingMessage } from 'http';
import type { EventListener } from '../event.types';
import { EventSocket } from '../event-socket';
export interface EventSocketServerConfig extends ServerOptions {
}
export declare class EventSocketServer<T extends string = string> {
    private wss;
    eventMap: Record<string, EventListener>;
    constructor(config: EventSocketServerConfig, callback?: () => void);
    onHeaders(callback: (headers: string[], req: IncomingMessage) => void): void;
    onConnection(callback: (es: EventSocket<T>, req: IncomingMessage) => void): void;
}
