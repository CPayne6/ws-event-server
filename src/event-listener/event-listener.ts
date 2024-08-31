import { EventMap, Listener } from '../event.types'


export abstract class EventListener<T extends string = string, K extends EventMap<T> = EventMap<T>> {
  listeners: Listener[]
  constructor(listeners: Listener[] = []) {
    this.listeners = listeners
  }

  /**
   * Register a listener for a 'message' with an event type
   * 
   * @param eventName 
   * @param callback 
   */
  on<J extends T>(eventName: J, callback: (data: K[J]) => void) {
    this.listeners.push({
      eventName,
      callback
    })
  }

  /**
   * Remove all listeners for a 'message' with an event type
   */
  off<J extends T>(eventName: J){
    this.listeners = this.listeners.filter((listener) => listener.eventName !== eventName)
  }
}
