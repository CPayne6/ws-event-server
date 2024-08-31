import { EventSocket } from '../event-socket'
import { EventMap, Listener } from '../event.types'

type BufferLike =
  | string
  | Buffer
  | DataView
  | number
  | ArrayBufferView
  | Uint8Array
  | ArrayBuffer

export class EventGroup<T extends string = string, K extends EventMap<T> = any> {
  private sockets: EventSocket<T, K>[]
  public readonly name: string

  constructor(name: string, sockets: EventSocket<T, K>[] = []) {
    this.sockets = sockets
    this.name = name
  }

  forEachMember(f: (id: string, es: EventSocket<T>) => void) {
    this.sockets.forEach((socket) => f(socket.id, socket))
  }

  static new<T extends string = string>(name: string) {
    return new EventGroup<T>(name)
  }

  getSockets() {
    return this.sockets
  }

  getMember(id: string): EventSocket<T, K> | undefined {
    return this.sockets.find((s) => s.id === id)
  }

  count() {
    return this.sockets.length
  }

  removeMember(id: string) {
    const index = this.sockets.findIndex((s) => s.id === id)
    if (index !== -1) {
      this.sockets.splice(index, 1)
    }
  }

  addMember(es: EventSocket<T, K>) {
    if (this.getMember(es.id) !== undefined) {
      throw new Error('Unable to add existing member')
    }
    es.ws.on('close', (e: CloseEvent) => this.removeMember(es.id))
    this.sockets.push(es)
  }

  dispatch(event: T, data: BufferLike, ignore?: EventSocket<T, K> | string) {
    this.forEachMember((id, es) => (es !== ignore && id !== ignore) ? es.dispatch(event, data) : undefined)
  }

  close(code?: number, data?: string | Buffer) {
    this.forEachMember((id, es) => es.ws.close(code, data))
  }

  terminate() {
    this.forEachMember((id, es) => es.terminate())
  }

  pause() {
    this.forEachMember((id, es) => es.ws.pause())
  }

  resume() {
    this.forEachMember((id, es) => es.ws.resume())
  }
}

