import { describe, it } from "node:test";
import assert from "node:assert";

import { Room } from "../../../shared/models/room.js";
import { Player } from "../../../server/models/player.js";

describe("Room", () => {
    it("owner should init null", (t) => {
        const room = new Room();
        assert.strictEqual(room.owner, null);
    });

    it("owner should be set on first player insert", (t) => {
        const room = new Room();
        const player = new Player();

        const playerAdded = room.addPlayer(player);
        assert.strictEqual(playerAdded, true);
        assert.strictEqual(room.game.players.length, 1);
        assert.strictEqual(room.owner, player.id);
    });
});
