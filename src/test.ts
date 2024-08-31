import { WebSocket } from 'ws';
import {EventSocket} from './'

type EventName = 'test' | 'test2'

interface EventMap {
  test: string;
  'test2': string[]
}

const ws = new WebSocket(null)

const e = new EventSocket<EventName, EventMap>(ws)

e.on('test', (data) => {
 data
})