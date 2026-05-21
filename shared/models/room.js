import utils from "../utils.js";
import { Game } from "../../server/models/game.js";

class RoomStatus {
    static WAITING = 0;
    static ACTIVE = 1;
    static FINISHED = 2;
}

class Room {
    constructor() {
        this.id = utils.randomNumber();
        this.owner = null;
        this.status = RoomStatus.WAITING;
        this.game = new Game();
        this.createdAt = Date.now();
    }

    addPlayer(player) {
        const isSuccess = this.game.addPlayer(player);
        if (isSuccess && this.owner === null) {
            this.owner = player.id;
        }

        return isSuccess;
    }

    removePlayer(playerId) {
        return this.game.removePlayer(playerId);
    }

    addSpectator(spectator) {
        return this.game.addSpectator(spectator);
    }

    removeSpectator(spectatorId) {
        return this.game.removeSpectator(spectatorId);
    }

    playerIsInRoom(playerId) {
        return this.game.players.findIndex(p => p.id == playerId) !== -1;
    }

    spectatorIsInRoom(spectatorId) {
        return this.game.spectators.findIndex(p => p.id == spectatorId) !== -1;
    }

    entityIsInRoom(entityId) {
        return this.playerIsInRoom(entityId) || this.spectatorIsInRoom(entityId);
    }

    startGame() {
        if (this.status > RoomStatus.WAITING) {
            return false;
        }

        this.status = RoomStatus.ACTIVE;
        return true;
    }

    endGame() {
        this.status = RoomStatus.FINISHED;
    }
}

export { Room, RoomStatus };
