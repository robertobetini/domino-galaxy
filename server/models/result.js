class BroadCastTypes {
    static NO_RESPONSE = 0;
    static SENDER_ONLY = 1;
    static ALL_BUT_SENDER = 2;
    static ALL = 3;
}

class Result {
    constructor(event, broadcastType, shouldDisconnectClient=false) {
        this.response = event;
        this.broadcastType = broadcastType;
        this.shouldDisconnectClient = shouldDisconnectClient;
    }
}

export { Result, BroadCastTypes };
