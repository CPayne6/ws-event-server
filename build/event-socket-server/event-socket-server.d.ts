/// <reference types="node" />
import { ServerOptions } from 'ws';
import { IncomingMessage } from 'http';
import type { EventMap } from '../event.types';
import { EventSocket } from '../event-socket';
interface ServerListener<T extends string = string, K extends EventMap<T> = any> {
    eventName: T;
    callback: (es: EventSocket<T, K>, data: any) => void;
}
export interface EventSocketServerConfig extends ServerOptions {
    extractId: (req: IncomingMessage) => Promise<string>;
}
export declare class EventSocketServer<T extends string = string, K extends EventMap<T> = any> {
    listeners: ServerListener<T>[];
    clients: EventSocket<T, K>[];
    private wss;
    extractId: (req: IncomingMessage) => Promise<string>;
    constructor(config: EventSocketServerConfig, callback?: () => void);
    onHeaders(callback: (headers: string[], req: IncomingMessage) => void): void;
    onConnection(callback: (es: EventSocket<T, K>, req: IncomingMessage) => void): void;
    on<J extends T>(eventName: J, callback: (es: EventSocket<T, K>, data: K[J]) => void): void;
    off(eventName: T): void;
}
export {};
