import { EventMap, Listener } from '../event.types';
export declare abstract class EventListener<T extends string = string, K extends EventMap<T> = EventMap<T>> {
    listeners: Listener[];
    constructor(listeners?: Listener[]);
    /**
     * Register a listener for a 'message' with an event type
     *
     * @param eventName
     * @param callback
     */
    on<J extends T>(eventName: J, callback: (data: K[J]) => void): void;
    /**
     * Remove all listeners for a 'message' with an event type
     */
    off<J extends T>(eventName: J): void;
}
