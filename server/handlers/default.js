import { EventTypes, GameEvent } from "../../shared/models/events.js";
import { Result, BroadCastTypes } from "../models/result.js";

const handler = (event, wsId, room) => {
    const response = new GameEvent({
        roomId: event.roomId,
        type: EventTypes.SERVER_ERROR,
        content: `unknown event type: ${event.type}`
    });

    return new Result(response, BroadCastTypes.SENDER_ONLY);
}

export default handler;
