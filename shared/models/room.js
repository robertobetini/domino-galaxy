import utils from "../utils.js";
import { Game } from "../../server/models/game.js";

const MAX_SPECTATORS = 20;

class RoomStatus {
    static WAITING = 0;
    static ACTIVE = 1;
    static FINISHED = 2;
}

class Room {
    constructor() {
        this.id = utils.randomNumber();
        this.owner = null;
        this.spectators = [];
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

    addSpectator(spectator) {
        if (this.spectators.find(s => s.id == spectator.id)) {
            return false;
        }

        if (this.spectators.length < MAX_SPECTATORS) {
            this.spectators.push(spectator);
            return true;
        }

        return false;
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

export { MAX_SPECTATORS, Room, RoomStatus };
