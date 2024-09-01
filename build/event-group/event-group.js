"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventGroup = void 0;
class EventGroup {
    constructor(name, sockets = []) {
        this.sockets = sockets;
        this.name = name;
    }
    forEachMember(f) {
        this.sockets.forEach((socket) => f(socket.id, socket));
    }
    static new(name) {
        return new EventGroup(name);
    }
    getSockets() {
        return this.sockets;
    }
    getMember(id) {
        return this.sockets.find((s) => s.id === id);
    }
    count() {
        return this.sockets.length;
    }
    removeMember(id) {
        const index = this.sockets.findIndex((s) => s.id === id);
        if (index !== -1) {
            this.sockets.splice(index, 1);
        }
    }
    addMember(es) {
        if (this.getMember(es.id) !== undefined) {
            throw new Error('Unable to add existing member');
        }
        es.ws.on('close', (e) => this.removeMember(es.id));
        this.sockets.push(es);
    }
    dispatch(event, data, ignore) {
        this.forEachMember((id, es) => (es !== ignore && id !== ignore) ? es.dispatch(event, data) : undefined);
    }
    close(code, data) {
        this.forEachMember((id, es) => es.ws.close(code, data));
    }
    terminate() {
        this.forEachMember((id, es) => es.terminate());
    }
    pause() {
        this.forEachMember((id, es) => es.ws.pause());
    }
    resume() {
        this.forEachMember((id, es) => es.ws.resume());
    }
}
exports.EventGroup = EventGroup;
