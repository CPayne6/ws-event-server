import { RawData } from 'ws'

export interface Payload<T, K> {
  event: T;
  data: K;
}

type EventMap<T extends string> = {
  [key in T]: any
}

export function extractDispatch<T extends string = string, K extends EventMap<T> = EventMap<T>>(rawData: RawData): [T, K[T]] {
  // Parse data
  let payload: Payload<T, K[T]>;
  try {
    payload = JSON.parse(rawData.toString());
  }
  catch (err) {
    throw new Error('Unable to read data')
  }

  // Extract event type and data
  const { event, data } = payload
  if (!event || !data) {
    throw new Error('Unable to parse event or data')
  }
  return [event, data]
}