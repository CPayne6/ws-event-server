import { RawData, ServerOptions, WebSocketServer, WebSocket } from 'ws'
import { IncomingHttpHeaders, IncomingMessage } from 'http'
import { extractDispatch } from '../utils'
import type { EventListener } from '../event.types'
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

export class EventSocketServer<T extends string = string> {
  private wss: WebSocketServer
  eventMap: Record<string, EventListener>

  constructor(config: EventSocketServerConfig, callback?: () => void) {
    this.eventMap = {}
    const port = config.port ?? 8080

    this.wss = new WebSocketServer({
      ...config,
      port
    }, callback)
  }

  onHeaders(callback: (headers: string[], req: IncomingMessage) => void) {
    this.wss.on('headers', callback)
  }

  onConnection(callback: (es: EventSocket<T>, req: IncomingMessage) => void) {
    this.wss.on('connection', (ws, req) => callback(EventSocket.from(ws), req))
  }
}
