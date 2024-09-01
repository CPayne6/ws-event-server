import { WebSocket } from 'ws'
import { EventSocket } from '../event-socket'
import { EventGroup } from './event-group'

jest.mock('ws', () => {
  return {
    WebSocket: function () {
      return {
        on: jest.fn(),
        send: jest.fn(),
        close: jest.fn(),
        terminate: jest.fn(),
        pause: jest.fn()
      }
    }
  }
})

describe('Testing EventGroup class', () => {
  const name = 'test-name'

  it('initializes the group', () => {
    const eg = new EventGroup(name)
    expect(eg.name).toEqual(name)
    expect(eg.getSockets()).toEqual([])
  })

  it('adds a new member', () => {
    const eg = new EventGroup(name)
    eg.addMember(new EventSocket(new WebSocket(null)))
    eg.addMember(new EventSocket(new WebSocket(null)))

    expect(eg.count()).toEqual(2)
  })

  it('dispatches to all members', () => {
    const eventName = 'test-event'
    const eventData = 'data'
    const eg = new EventGroup(name)
    const testDispatch = jest.fn()
    const test2Dispatch = jest.fn()
    eg.addMember({
      id: 'test',
      dispatch: testDispatch,
      ws: new WebSocket(null),
      on: () => { },
      terminate: function (): void {
        throw new Error('Function not implemented.')
      },
      listeners: [],
      off: function <J extends string>(eventName: J): void {
        throw new Error('Function not implemented.')
      }
    })
    eg.addMember({
      id: 'test2',
      dispatch: test2Dispatch,
      ws: new WebSocket(null),
      on: () => { },
      terminate: function (): void {
        throw new Error('Function not implemented.')
      },
      listeners: [],
      off: function <J extends string>(eventName: J): void {
        throw new Error('Function not implemented.')
      }
    })

    eg.dispatch(eventName, eventData)

    expect(testDispatch).toHaveBeenCalledWith(eventName, eventData)
    expect(test2Dispatch).toHaveBeenCalledWith(eventName, eventData)
  })

})