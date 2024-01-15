import { EventSocket } from '../event-socket'

type BufferLike =
  | string
  | Buffer
  | DataView
  | number
  | ArrayBufferView
  | Uint8Array
  | ArrayBuffer

type MembersMap = Record<string, EventSocket>

export class EventGroup<T extends string = string> {
  private members: MembersMap
  public readonly name: string

  constructor(name: string) {
    this.members = {}
    this.name = name
  }

  forEachMember(f: (id: string, es: EventSocket<T>) => void) {
    const membersList = Object.entries(this.members)
    membersList.forEach(([id, es]) => f(id, es))
  }

  static new<T extends string = string>(name: string) {
    return new EventGroup<T>(name)
  }

  getMembers() {
    return this.members
  }

  getFirstMember(): [string, EventSocket] | undefined {
    return Object.entries(this.members)[0]
  }


  getMember(id: string): EventSocket | undefined {
    return this.members[id]
  }

  count() {
    return Object.keys(this.members).length
  }

  removeMember(id: string) {
    delete this.members[id]
  }

  addMember(id: string, es: EventSocket) {
    if (this.members[id] !== undefined) {
      throw new Error('Unable to add existing member')
    }
    es.ws.on('close', (e: CloseEvent) => this.removeMember(id))
    this.members[id] = es
  }

  dispatch(event: T, data: BufferLike, ignore?: EventSocket | string) {
    this.forEachMember((id, es) => (es !== ignore && id !== ignore) ? es.dispatch(event, data) : undefined)
  }


  close(code?: number, data?: string | Buffer) {
    this.forEachMember((id, es) => es.ws.close(code, data))
  }

  terminate() {
    this.forEachMember((id, es) => es.ws.terminate())
  }

  pause() {
    this.forEachMember((id, es) => es.ws.pause())
  }

  resume() {
    this.forEachMember((id, es) => es.ws.resume())
  }
}

