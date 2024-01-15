import { RawData } from 'ws'

export function extractDispatch<T extends string = string, K = any>(rawData: RawData): [T, K] {
  // Parse data
  let payload: [T, K];
  try {
    payload = JSON.parse(rawData.toString());
  }
  catch (err) {
    throw new Error('Unable to read data')
  }

  // Extract event type and data
  const [event, data] = payload
  if (!event || !data) {
    throw new Error('Unable to parse event or data')
  }
  return [event, data]
}