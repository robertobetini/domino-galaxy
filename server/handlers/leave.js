import { EventTypes, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastTypes } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

const genericHandler = (event, wsId, room, isSpectator) => {
    let response = new GameEvent({
        roomId: event.roomId,
        type: EventTypes.ROOM_LEFT,
        content: wsId
    });

    const isSuccess = isSpectator ? room.removeSpectator(wsId) : room.removePlayer(wsId);
    if (!isSuccess) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: "spectator/player not found"
        });

        return new Result(response, BroadCastTypes.SENDER_ONLY);
    }

    return new Result(response, BroadCastTypes.ALL, true);
}

const playerLeaveHandler = (event, wsId, room) => genericHandler(event, wsId, room, false);
const spectatorLeaveHandler = (event, wsId, room) => genericHandler(event, wsId, room, true);

export { playerLeaveHandler, spectatorLeaveHandler };
