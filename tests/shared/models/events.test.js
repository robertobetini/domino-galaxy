import { describe, it } from "node:test";
import assert from "node:assert";

import { GameEvent, EventTypes } from "../../../shared/models/events.js";

describe("GameEvent", () => {
    it("valid information should be ok", (t) => {
        const eventInfo = {
            id: 1,
            roomId: 1,
            type: EventTypes.PLAYER_JOIN,
            content: "event content",
            timestamp: 1_000_000
        };

        assert.doesNotThrow(() => new GameEvent(eventInfo));
    });

    it("empty content should be ok", (t) => {
        const eventInfo = {
            id: 1,
            roomId: 1,
            type: EventTypes.PLAYER_JOIN,
            timestamp: 1_000_000
        };

        assert.doesNotThrow(() => new GameEvent(eventInfo));
    });

    it("empty timestamp should be ok", (t) => {
        const eventInfo = {
            id: 1,
            roomId: 1,
            type: EventTypes.PLAYER_JOIN,
            content: "event content"
        };

        let event = new GameEvent(eventInfo);

        assert.strictEqual(event.timestamp > 0, true, `expected timestamp '${event.timestamp}' to be greater than 0`);
        assert.strictEqual(event.timestamp <= Date.now(), true);
    });

    it("empty id should be ok", (t) => {
        const eventInfo = {
            roomId: 1,
            type: EventTypes.PLAYER_JOIN,
            content: "event content"
        };

        let event = new GameEvent(eventInfo);

        assert.strictEqual(event.id > 0, true);
    });

    it("type other than those in EvenTypes should map to UNKNOWN", (t) => {
        const nonExistingTypes = [ 29, 30, 31, -1, -2, -3];

        for (const type of nonExistingTypes) {
            const eventInfo = {
                roomId: 1,
                type: type
            };
            let event = new GameEvent(eventInfo);

            assert.strictEqual(event.type, EventTypes.UNKNOWN);
        }
    });

    it("toString should create event string ok", (t) => {
        const eventInfo = {
            id: 100,
            roomId: 200,
            timestamp: Date.now(),
            type: EventTypes.SERVER_ACK,
            content: "event content"
        };

        let event = new GameEvent(eventInfo);
        const eventString = event.toString();
        const params = eventString.split("|");

        assert.equal(params[0], eventInfo.id, `${params[0]} != ${eventInfo.id}`);
        assert.equal(params[1], eventInfo.roomId, `${params[1]} != ${eventInfo.roomId}`);
        assert.equal(params[2], eventInfo.timestamp, `${params[2]} != ${eventInfo.timestamp}`);
        assert.equal(params[3], eventInfo.type, `${params[3]} != ${eventInfo.type}`);
        assert.equal(params[4], eventInfo.content, `${params[4]} != ${eventInfo.content}`);
    });
});
