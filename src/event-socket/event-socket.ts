import { ClientRequestArgs } from 'http'
import { extractDispatch } from '../utils'
import { ClientOptions, WebSocket } from 'ws'

/**
 * Wrapper for WebSocket with dispatch functionality
 */
export class EventSocket<T extends string = string> {
  ws: WebSocket

  constructor(ws: WebSocket) {
    this.ws = ws
  }

  static new<T extends string = string>(address: string, options?: ClientOptions | ClientRequestArgs) {
    const ws = new WebSocket(address, options)
    return new EventSocket<T>(ws)
  }

  static from<T extends string = string>(ws: WebSocket) {
    return new EventSocket<T>(ws)
  }

  /**
   * Register a listener for a 'message' with an event type
   * 
   * @param eventName 
   * @param callback 
   */
  onDispatch<K = any>(eventName: T, callback: (data: K) => void) {
    this.ws.on('message', (rawData) => {
      try {
        const [event, data] = extractDispatch(rawData)
        if (event === eventName) {
          callback(data)
        }
      }
      catch (err) {
        console.error(err)
      }
    })
  }

  /**
   * Format a dispatch and send as a 'message'
   * @param eventName 
   * @param data 
   */
  dispatch(eventName: T, data?: any) {
    this.ws.send(JSON.stringify([eventName, data]))
  }
}