import { EventTypes, GameEvent } from "../../shared/models/events.js";
import { Spectator } from "../models/spectator.js";
import { Result, BroadCastTypes } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

const handler = (event, wsId) => {
    const spec = new Spectator({ id: wsId });
    let response = new GameEvent({
        roomId: event.roomId,
        type: EventTypes.ROOM_JOINED,
        content: spec.id
    });

    const room = roomRepository.get(event.roomId);
    if (!room) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: `room ${event.roomId} does not exist`
        });

        return new Result(response, BroadCastTypes.SENDER_ONLY);
    }

    const isSuccess = room.addSpectator(spec);
    if (!isSuccess) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: `spectator already joined room ${event.roomId}`
        });
        
        return new Result(response, BroadCastTypes.SENDER_ONLY);
    }

    return new Result(response, BroadCastTypes.ALL);
}

export default { handler };
