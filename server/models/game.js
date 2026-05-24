import utils from "../../shared/utils.js";
import { Pieces } from "../../shared/models/piece.js";

const MAX_PLAYERS = 4;
const MAX_SPECTATORS = 20;
const INIT_HAND_SIZE = 7;

class Game {
    constructor() {
        this.players = [];
        this.spectators = [];
        this.board = new Uint8Array();
        this.pile = new Uint8Array();
    }

    addPlayer(player) {
        if (this.entityIsInRoom(player.id)) {
            return false;
        }
        
        if (this.players.length < MAX_PLAYERS) {
            this.players.push(player);
            return true;
        }

        return false;
    }

    removePlayer(playerId) {
        const index = this.players.findIndex(p => p.id == playerId);
        if (index === -1) {
            return false;
        }

        this.players.splice(index, 1);
        return true;
    }

    addSpectator(spectator) {
        if (this.entityIsInRoom(spectator.id)) {
            return false;
        }

        if (this.spectators.length < MAX_SPECTATORS) {
            this.spectators.push(spectator);
            return true;
        }

        return false;
    }

    removeSpectator(spectatorId) {
        const index = this.spectators.findIndex(p => p.id == spectatorId);
        if (index === -1) {
            return false;
        }
        
        this.spectators.splice(index, 1);
        return true;
    }

    playerIsInRoom(playerId) {
        return this.players.findIndex(p => p.id == playerId) !== -1;
    }

    spectatorIsInRoom(spectatorId) {
        return this.spectators.findIndex(p => p.id == spectatorId) !== -1;
    }

    entityIsInRoom(entityId) {
        return this.playerIsInRoom(entityId) || this.spectatorIsInRoom(entityId);
    }

    init() {
        const shuffledPieces = utils.shuffle(Pieces.ALL, { iterations: 250 });

        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            player.hand = new Uint8Array(shuffledPieces.slice(INIT_HAND_SIZE * i, INIT_HAND_SIZE * (i + 1)));
        }

        this.pile = new Uint8Array(shuffledPieces.slice(INIT_HAND_SIZE * this.players.length));
    }
}

export { MAX_PLAYERS, Game };
