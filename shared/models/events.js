import utils from "../utils.js";

class EventTypes {
    static UNKNOWN = 0;

    // client events
    static PLAYER_JOIN = 1;
    static PLAYER_LEAVE = 2;
    static PLAYER_KICK = 3;
    static PLAYER_BAN = 4;
    static SPEC_JOIN = 5;
    static SPEC_LEAVE = 6;
    static SPEC_KICK = 7;
    static SPEC_BAN = 8;
    static PIECE_INSERT = 9;
    static SYNC = 10;
    static SEND_MESSAGE = 11;
    static IDLE_CHECK = 12;
    static CLIENT_ACK = 13;
    static CLIENT_ERROR = 14;
    static CHECK_PLAYERS = 15;
    static CHECK_SPECS = 16;

    // server events
    static ROOM_JOINED = 101;
    static ROOM_LEFT = 102;
    static GAME_STATUS = 103;
    static GAME_TURN_FINISHED = 104;
    static GAME_FINISHED = 105;
    static ACTION_DENIED = 106;
    static NEW_MESSAGE = 107;
    static IDLE_CHECK = 108;
    static SERVER_ACK = 109;
    static SERVER_ERROR = 110;
    static PLAYER_LIST = 111;
    static SPEC_LIST = 112;

    static EVENT_TYPE_LIST = Object.keys(EventTypes).map(key => EventTypes[key]);

    static resolve(type) {
        return EventTypes.EVENT_TYPE_LIST.includes(type) ? type : EventTypes.UNKNOWN;
    }
}

class GameEvent {
    constructor({ roomId, type, id=0, content="", timestamp=Date.now() }) {
        this.id = id == 0 ? utils.randomNumber() : id;
        this.roomId = roomId;
        this.timestamp = timestamp;
        this.type = EventTypes.resolve(type);
        this.content = content;
    }

    toString() {
        return `${this.id || ""}|${this.roomId || ""}|${this.timestamp}|${this.type || ""}|${this.content}`;
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
