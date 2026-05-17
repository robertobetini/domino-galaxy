import utils from "../utils.js";

class RoomStatus {
    static WAITING = 0;
    static ACTIVE = 0;
    static FINISHED = 0;
}

class Room {
    constructor() {
        this.id = utils.randomNumber();
        this.players = [];
        this.owner = 0;
        this.status = RoomStatus.WAITING;
        this.board = new Uint8Array();
        this.createdAt = Date.now();
    }
}
