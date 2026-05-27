import { describe, it } from "node:test";
import assert from "node:assert";

import { Game } from "../../../server/models/game.js";
import { Player } from "../../../server/models/player.js";
import { Spectator } from "../../../server/models/spectator.js";

const testInit = (totalPlayers) => {
    const game = new Game();

    for (let id = 1; id <= totalPlayers; id++) {
        const player = new Player({ id });
        game.addPlayer(player);    
    }

    game.init();

    const pieceFreqs = {};
    for (const player of game.players) {
        assert.strictEqual(player.hand.length, 7);
        for (const piece of player.hand) {
            pieceFreqs[piece] = pieceFreqs[piece] ?? 0;
            pieceFreqs[piece]++;
        }
    }

    assert.strictEqual(game.pile.length, 28 - (7 * game.players.length));
    
    const repeatedPieces = Object.values(pieceFreqs).filter(value => value > 1);
    assert.strictEqual(repeatedPieces.length, 0);
}

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
        assert.strictEqual(game.players.length, 1);
        assert.strictEqual(game.players[0], player);
    });

    it("insert new spectator should be ok", (t) => {
        const game = new Game();
        const spectator = new Spectator();

        const addedSpectatorWithSuccess = game.addSpectator(spectator);

        assert.strictEqual(addedSpectatorWithSuccess, true);
        assert.strictEqual(game.spectators.length, 1);
        assert.strictEqual(game.spectators[0], spectator);
    });

    it("should not insert duplicate spectator", (t) => {
        const game = new Game();
        const spectator = new Spectator();

        const firstAttempt = game.addSpectator(spectator);
        const secondAttempt = game.addSpectator(spectator);

        assert.strictEqual(firstAttempt, true);
        assert.strictEqual(secondAttempt, false);
        assert.strictEqual(game.spectators.length, 1);
        assert.strictEqual(game.spectators[0], spectator);
    });

    it("remove existing player should be ok", (t) => {
        const game = new Game();
        const player = new Player();

        game.addPlayer(player);
        const playerRemovedWithSuccess = game.removePlayer(player.id);

        assert.strictEqual(playerRemovedWithSuccess, true);
        assert.strictEqual(game.players.length, 0);
    });

    it("remove non existing player should return false", (t) => {
        const game = new Game();
        const player = new Player();

        game.addPlayer(player);
        const playerRemovedWithSuccess = game.removePlayer(-1);

        assert.strictEqual(playerRemovedWithSuccess, false);
        assert.strictEqual(game.players.length, 1);
    });

    it("remove existing spectator should be ok", (t) => {
        const game = new Game();
        const spectator = new Spectator();

        game.addSpectator(spectator);
        const spectatorRemovedWithSuccess = game.removeSpectator(spectator.id);

        assert.strictEqual(spectatorRemovedWithSuccess, true);
        assert.strictEqual(game.spectators.length, 0);
    });

    it("remove non existing spectator should return false", (t) => {
        const game = new Game();
        const spectator = new Spectator();

        game.addSpectator(spectator);
        const spectatorRemovedWithSuccess = game.removeSpectator(-1);

        assert.strictEqual(spectatorRemovedWithSuccess, false);
        assert.strictEqual(game.spectators.length, 1);
    });

    describe("init", () => {
        it("with 1 player should be ok", (t) => testInit(1));
        it("with 2 players should be ok", (t) => testInit(2));
        it("with 3 players should be ok", (t) => testInit(3));
        it("with 4 players should be ok", (t) => testInit(4));
    });
});
