import { ClientRequestArgs } from 'http'
import { extractDispatch } from '../utils'
import { EventMap, Listener } from '../event.types'
import {EventListener} from '../event-listener'
import { ClientOptions, WebSocket } from 'ws'

/**
 * Wrapper for WebSocket with dispatch functionality
 */
export class EventSocket<T extends string, K extends EventMap<T> = any> extends EventListener<T, K> {
  ws: WebSocket
  id: string

  constructor(ws: WebSocket, listeners: Listener[] = []) {
    super(listeners)
    this.id = crypto.randomUUID()
    this.ws = ws
    ws.on('message', (rawData) => {
      const [event, data] = extractDispatch<T, K>(rawData)
      for(const listener of this.listeners){
        const { eventName, callback } = listener
        try {
          if (event === eventName) {
            callback(data)
          }
        }
        catch (err) {
          console.error(err)
        }
      }
    })
    this.listeners = []
  }

  static new<T extends string = string, K extends EventMap<T> = any>(address: string, options?: ClientOptions | ClientRequestArgs) {
    const ws = new WebSocket(address, options)
    return new EventSocket<T, K>(ws)
  }

  static from<T extends string = string, K extends EventMap<T> = any>(ws: WebSocket) {
    return new EventSocket<T, K>(ws)
  }

  /**
   * Format a dispatch and send as a 'message'
   * @param eventName 
   * @param data 
   */
  dispatch(eventName: T, data?: K[T]) {
    this.ws.send(JSON.stringify([eventName, data]))
  }

  /**
   * Terminate the socket
   */
  terminate() {
    this.ws.terminate()
  }
}