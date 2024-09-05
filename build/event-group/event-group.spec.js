"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const event_socket_1 = require("../event-socket");
const event_group_1 = require("./event-group");
jest.mock('ws', () => {
    return {
        WebSocket: function () {
            return {
                on: jest.fn(),
                send: jest.fn(),
                close: jest.fn(),
                terminate: jest.fn(),
                pause: jest.fn()
            };
        }
    };
});
describe('Testing EventGroup class', () => {
    const name = 'test-name';
    it('initializes the group', () => {
        const eg = new event_group_1.EventGroup(name);
        expect(eg.name).toEqual(name);
        expect(eg.getSockets()).toEqual([]);
    });
    it('adds a new member', () => {
        const eg = new event_group_1.EventGroup(name);
        eg.addMember(new event_socket_1.EventSocket({ ws: new ws_1.WebSocket(null), id: 'test1' }));
        eg.addMember(new event_socket_1.EventSocket({ ws: new ws_1.WebSocket(null), id: 'test2' }));
        expect(eg.count()).toEqual(2);
    });
    it('dispatches to all members', () => {
        const eventName = 'test-event';
        const eventData = 'data';
        const eg = new event_group_1.EventGroup(name);
        const testDispatch = jest.fn();
        const test2Dispatch = jest.fn();
        eg.addMember({
            id: 'test',
            dispatch: testDispatch,
            ws: new ws_1.WebSocket(null),
            on: () => { },
            terminate: function () {
                throw new Error('Function not implemented.');
            },
            listeners: [],
            off: function (eventName) {
                throw new Error('Function not implemented.');
            }
        });
        eg.addMember({
            id: 'test2',
            dispatch: test2Dispatch,
            ws: new ws_1.WebSocket(null),
            on: () => { },
            terminate: function () {
                throw new Error('Function not implemented.');
            },
            listeners: [],
            off: function (eventName) {
                throw new Error('Function not implemented.');
            }
        });
        eg.dispatch(eventName, eventData);
        expect(testDispatch).toHaveBeenCalledWith(eventName, eventData);
        expect(test2Dispatch).toHaveBeenCalledWith(eventName, eventData);
    });
});
