import { RawData } from 'ws';
export interface Payload<T, K> {
    event: T;
    data: K;
}
type EventMap<T extends string> = {
    [key in T]: any;
};
export declare function extractDispatch<T extends string = string, K extends EventMap<T> = EventMap<T>>(rawData: RawData): [T, K[T]];
export {};
