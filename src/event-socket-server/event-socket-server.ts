import { ServerOptions, WebSocketServer } from 'ws'
import { IncomingMessage } from 'http'
import type { Listener, EventMap } from '../event.types'
import { EventSocket } from '../event-socket'

// Old implementation
// const eventMap: Record<string, EventListener> = {
//   [WsEvent.CREATE_LOBBY]: messageHandlers.createLobby,
//   [WsEvent.INIT]: messageHandlers.unhandled,
//   [WsEvent.KICK]: messageHandlers.kick,
//   [WsEvent.START]: messageHandlers.unhandled,
//   [WsEvent.JOIN]: messageHandlers.unhandled
// }

export interface EventSocketServerConfig extends ServerOptions {
}

export class EventSocketServer<T extends string = string, K extends EventMap<T> = any> {
  private wss: WebSocketServer

  constructor(config: EventSocketServerConfig, callback?: () => void) {
    const port = config.port ?? 8080

    this.wss = new WebSocketServer({
      ...config,
      port
    }, callback)
  }

  onHeaders(callback: (headers: string[], req: IncomingMessage) => void) {
    this.wss.on('headers', callback)
  }

  onConnection(callback: (es: EventSocket<T, K>, req: IncomingMessage) => void) {
    this.wss.on('connection', (ws, req) => {
      const es = EventSocket.from<T, K>(ws);
      callback(es, req)
    })
  }
}
