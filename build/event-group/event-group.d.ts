/// <reference types="node" />
import { EventSocket } from '../event-socket';
type BufferLike = string | Buffer | DataView | number | ArrayBufferView | Uint8Array | ArrayBuffer;
type MembersMap = Record<string, EventSocket>;
export declare class EventGroup<T extends string = string> {
    private members;
    readonly name: string;
    constructor(name: string);
    forEachMember(f: (id: string, es: EventSocket<T>) => void): void;
    static new<T extends string = string>(name: string): EventGroup<T>;
    getMembers(): MembersMap;
    getFirstMember(): [string, EventSocket] | undefined;
    getMember(id: string): EventSocket | undefined;
    count(): number;
    removeMember(id: string): void;
    addMember(id: string, es: EventSocket): void;
    dispatch(event: T, data: BufferLike, ignore?: EventSocket | string): void;
    close(code?: number, data?: string | Buffer): void;
    terminate(): void;
    pause(): void;
    resume(): void;
}
export {};
