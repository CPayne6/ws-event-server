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
        expect(eg.getMembers()).toEqual({});
    });
    it('adds a new member', () => {
        const eg = new event_group_1.EventGroup(name);
        eg.addMember('test', new event_socket_1.EventSocket(new ws_1.WebSocket(null)));
        eg.addMember('test2', new event_socket_1.EventSocket(new ws_1.WebSocket(null)));
        expect(eg.count()).toEqual(2);
    });
    it('dispatches to all members', () => {
        const eventName = 'test-event';
        const eventData = 'data';
        const eg = new event_group_1.EventGroup(name);
        const testDispatch = jest.fn();
        const test2Dispatch = jest.fn();
        eg.addMember('test', {
            dispatch: testDispatch,
            ws: new ws_1.WebSocket(null),
            onDispatch: () => { }
        });
        eg.addMember('test2', {
            dispatch: test2Dispatch,
            ws: new ws_1.WebSocket(null),
            onDispatch: () => { }
        });
        eg.dispatch(eventName, eventData);
        expect(testDispatch).toHaveBeenCalledWith(eventName, eventData);
        expect(test2Dispatch).toHaveBeenCalledWith(eventName, eventData);
    });
});
