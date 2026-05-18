import { EventTypes, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastTypes } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

const handler = (event, wsId) => {
    const player = new Player({ id: wsId });
    let response = new GameEvent({
        roomId: event.roomId,
        type: EventTypes.ROOM_JOINED,
        content: player.id
    });

    const room = roomRepository.get(event.roomId);
    if (!room) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: `room ${event.roomId} does not exist`
        });

        return new Result(response, BroadCastTypes.SENDER_ONLY);;
    }
    console.log(room);

    const isSuccess = room.addPlayer(player);
    if (!isSuccess) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: `player already joined room ${event.roomId}`
        });
    }

    return new Result(response, BroadCastTypes.ALL);
}

export default { handler };
