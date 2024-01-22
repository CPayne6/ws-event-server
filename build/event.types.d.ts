import { EventSocket } from './event-socket';
export type EventListener<D = any> = (socket: EventSocket, id: string, data: D | undefined) => void;
