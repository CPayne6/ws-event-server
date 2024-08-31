import { EventSocket } from './event-socket'

export type EventMap<T extends string> = {
  [key in T]: any
}

export interface Listener {
  eventName: string,
  callback: (data: any) => void
}