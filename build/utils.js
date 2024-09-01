"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDispatch = void 0;
function extractDispatch(rawData) {
    // Parse data
    let payload;
    try {
        payload = JSON.parse(rawData.toString());
    }
    catch (err) {
        throw new Error('Unable to read data');
    }
    // Extract event type and data
    const { event, data } = payload;
    if (!event || !data) {
        throw new Error('Unable to parse event or data');
    }
    return [event, data];
}
exports.extractDispatch = extractDispatch;
