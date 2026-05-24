import utils from "../utils.js";

class EventType {
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
    static START_GAME = 9;
    static PIECE_INSERT = 10;
    static SYNC = 11;
    static SEND_MESSAGE = 12;
    static IDLE_CHECK_RESPONSE = 13;
    static CLIENT_ACK = 14;
    static CLIENT_ERROR = 15;
    static CHECK_PLAYERS = 16;
    static CHECK_SPECS = 17;

    // server events
    static ROOM_JOINED = 101;
    static ROOM_LEFT = 102;
    static GAME_STARTED = 103;
    static GAME_STATUS = 104;
    static GAME_TURN_FINISHED = 105;
    static GAME_FINISHED = 106;
    static ACTION_DENIED = 107;
    static NEW_MESSAGE = 108;
    static IDLE_CHECK = 109;
    static SERVER_ACK = 110;
    static ERROR = 111;
    static PLAYER_LIST = 112;
    static SPEC_LIST = 113;

    static ALL = Object.keys(EventType).map(key => EventType[key]);

    static resolve(type) {
        return EventType.ALL.includes(type) ? type : EventType.UNKNOWN;
    }
}

class GameEvent {
    constructor({ roomId, type, id=0, content="", timestamp=Date.now() }) {
        this.id = id == 0 ? utils.randomNumber() : id;
        this.roomId = roomId;
        this.timestamp = timestamp;
        this.type = EventType.resolve(type);
        this.content = content;
    }

    toString() {
        return `${this.id || ""}|${this.roomId || ""}|${this.timestamp}|${this.type || ""}|${this.content}`;
    }

    static fromString(eventString) {
        const [ id, roomId, timestamp, type, content ] = eventString.split("|");
        
        return new GameEvent({
            id: parseInt(id),
            roomId: parseInt(roomId),
            timestamp: parseInt(timestamp),
            type: parseInt(type),
            content: content,
        });
    }
}

export { EventType, GameEvent };
