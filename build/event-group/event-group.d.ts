/// <reference types="node" />
import { EventSocket } from '../event-socket';
import { EventMap } from '../event.types';
type BufferLike = string | Buffer | DataView | number | ArrayBufferView | Uint8Array | ArrayBuffer;
export declare class EventGroup<T extends string = string, K extends EventMap<T> = any> {
    private sockets;
    readonly name: string;
    constructor(name: string, sockets?: EventSocket<T, K>[]);
    forEachMember(f: (id: string, es: EventSocket<T>) => void): void;
    static new<T extends string = string>(name: string): EventGroup<T, any>;
    getSockets(): EventSocket<T, K>[];
    getMember(id: string): EventSocket<T, K> | undefined;
    count(): number;
    removeMember(id: string): void;
    addMember(es: EventSocket<T, K>): void;
    dispatch(event: T, data: BufferLike, ignore?: EventSocket<T, K> | string): void;
    close(code?: number, data?: string | Buffer): void;
    terminate(): void;
    pause(): void;
    resume(): void;
}
export {};
