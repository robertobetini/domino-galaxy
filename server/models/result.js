class BroadCastType {
    static NO_RESPONSE = 0;
    static SENDER_ONLY = 1;
    static ALL_BUT_SENDER = 2;
    static ALL = 3;
}

class Result {
    constructor(event, broadcastType, clientToBeDisconnected=null) {
        this.response = event;
        this.broadcastType = broadcastType;
        this.clientToBeDisconnected = clientToBeDisconnected;
    }
}

export { Result, BroadCastType };
