import { EventType, GameEvent } from "../../shared/models/events.js";
import { Result, BroadCastType } from "../models/result.js";

const handler = (event, wsId, room) => {
    const response = new GameEvent({
        roomId: event.roomId,
        type: EventType.ERROR,
        content: `unknown event type: ${event.type}`
    });

    return new Result(response, BroadCastType.SENDER_ONLY);
}

export default handler;
