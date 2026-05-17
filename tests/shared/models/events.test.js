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
            id: 1,
            roomId: 1,
            type: EventTypes.PLAYER_JOIN,
            content: "event content"
        };

        let event = new GameEvent(eventInfo);
        console.log(event.id);

        assert.strictEqual(event.id > 0, true);
    });
});
