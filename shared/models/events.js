import utils from "../utils.js";

class EventTypes {
    static UNKNOWN = 0;

    // client events
    static PLAYER_JOIN = 1;
    static PLAYER_LEAVE = 2;
    static PLAYER_KICK = 3;
    static PLAYER_BAN = 4;
    static SPEC_JOIN = 5;
    static SPEC_LEFT = 6;
    static SPEC_KICK = 7;
    static SPEC_BAN = 8;
    static PIECE_INSERT = 9;
    static SYNC = 10;
    static SEND_MESSAGE = 11;
    static IDLE_CHECK = 12;
    static CLIENT_ACK = 13;
    static CLIENT_ERROR = 14;

    // server events
    static ROOM_JOINED = 15;
    static ROOM_LEFT = 16;
    static GAME_STATUS = 17;
    static GAME_TURN_FINISHED = 18;
    static GAME_FINISHED = 19;
    static ACTION_DENIED = 20;
    static NEW_MESSAGE = 21;
    static IDLE_CHECK = 22;
    static SERVER_ACK = 23;
    static SERVER_ERROR = 24;
}

class GameEvent {
    constructor({ roomId, type, id=0, content="", timestamp=Date.now() }) {
        this.id = id;
        this.roomId = roomId;
        this.timestamp = timestamp;
        this.type = type;
        this.content = content;

        if (this.id == 0) {
            this.id = utils.randomNumber();
        }
        if (this.type < EventTypes.PLAYER_JOIN || this.type > EventTypes.SERVER_ERROR) {
            this.type = EventTypes.UNKNOWN;
        }
    }

    toString() {
        return `${this.id || ""}|${this.roomId || ""}|${this.timestamp}|${this.type || ""}|${this.content}`
    }

    static fromString(eventString) {
        const [ id, roomId, timestamp, type, content ] = eventString.split("|");

        return new GameEvent({
            id: parseInt(id, 10),
            roomId: parseInt(roomId),
            timestamp: parseInt(timestamp),
            type: parseInt(type),
            content: content,
        });
    }
}

export { EventTypes, GameEvent };
