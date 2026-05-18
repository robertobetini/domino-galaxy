import { describe, it } from "node:test";
import assert from "node:assert";

import { Game } from "../../../server/models/game.js";
import { Player } from "../../../server/models/player.js";

describe("Game", () => {
    it("insert new player should be ok", (t) => {
        const game = new Game();
        const player = new Player();

        const addedPlayerWithSuccess = game.addPlayer(player);
        assert.strictEqual(addedPlayerWithSuccess, true);
        assert.strictEqual(game.players.length, 1);
        assert.strictEqual(game.players[0], player);
    });

    it("should not insert duplicate player", (t) => {
        const game = new Game();
        const player = new Player();

        const firstAttempt = game.addPlayer(player);
        const secondAttempt = game.addPlayer(player);

        assert.strictEqual(firstAttempt, true);
        assert.strictEqual(secondAttempt, false);
        assert.strictEqual(game.players.length === 1, true);
        assert.strictEqual(game.players[0], player);
    });
});
