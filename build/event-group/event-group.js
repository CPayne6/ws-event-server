"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventGroup = void 0;
class EventGroup {
    constructor(name) {
        this.members = {};
        this.name = name;
    }
    forEachMember(f) {
        const membersList = Object.entries(this.members);
        membersList.forEach(([id, es]) => f(id, es));
    }
    static new(name) {
        return new EventGroup(name);
    }
    getMembers() {
        return this.members;
    }
    getFirstMember() {
        return Object.entries(this.members)[0];
    }
    getMember(id) {
        return this.members[id];
    }
    count() {
        return Object.keys(this.members).length;
    }
    removeMember(id) {
        delete this.members[id];
    }
    addMember(id, es) {
        if (this.members[id] !== undefined) {
            throw new Error('Unable to add existing member');
        }
        es.ws.on('close', (e) => this.removeMember(id));
        this.members[id] = es;
    }
    dispatch(event, data, ignore) {
        this.forEachMember((id, es) => (es !== ignore && id !== ignore) ? es.dispatch(event, data) : undefined);
    }
    close(code, data) {
        this.forEachMember((id, es) => es.ws.close(code, data));
    }
    terminate() {
        this.forEachMember((id, es) => es.ws.terminate());
    }
    pause() {
        this.forEachMember((id, es) => es.ws.pause());
    }
    resume() {
        this.forEachMember((id, es) => es.ws.resume());
    }
}
exports.EventGroup = EventGroup;
