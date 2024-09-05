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

interface ServerListener<T extends string = string, K extends EventMap<T> = any> {
  eventName: T;
  callback: (es: EventSocket<T, K>, data: any) => void
}

export interface EventSocketServerConfig extends ServerOptions {
  extractId: (req: IncomingMessage) => Promise<string>
}

export class EventSocketServer<T extends string = string, K extends EventMap<T> = any> {
  listeners: ServerListener<T>[];
  clients: EventSocket<T, K>[];
  private wss: WebSocketServer;
  extractId: (req: IncomingMessage) => Promise<string>

  constructor(config: EventSocketServerConfig, callback?: () => void) {
    const port = config.port ?? 8080;
    this.extractId = config.extractId;
    this.listeners = [];
    this.clients = [];
    this.wss = new WebSocketServer({
      ...config,
      port
    }, callback)
  }

  onHeaders(callback: (headers: string[], req: IncomingMessage) => void) {
    this.wss.on('headers', callback)
  }

  onConnection(callback: (es: EventSocket<T, K>, req: IncomingMessage) => void) {
    this.wss.on('connection', async (ws, req) => {
      const id = await this.extractId(req);
      const es = EventSocket.from<T, K>(id, ws);
      this.clients.push(es);
      this.listeners.forEach((listener) => {
        es.on(listener.eventName, (data) => listener.callback(es, data))
      });
      callback(es, req)
    });
  }

  on<J extends T>(eventName: J, callback: (es: EventSocket<T, K>, data: K[J]) => void) {
    this.listeners.push({
      eventName,
      callback
    })
  }

  off(eventName: T) {
    this.clients.forEach(es => es.off(eventName));
    this.listeners = this.listeners.filter(listener => listener.eventName !== eventName);
  }
}
