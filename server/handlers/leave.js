import { EventType, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastType } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

const genericHandler = (event, wsId, room, isSpectator) => {
    let response = new GameEvent({
        roomId: event.roomId,
        type: EventType.ROOM_LEFT,
        content: wsId
    });

    const isSuccess = isSpectator ? room.removeSpectator(wsId) : room.removePlayer(wsId);
    if (!isSuccess) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventType.ERROR,
            content: "spectator/player not found"
        });

        return new Result(response, BroadCastType.SENDER_ONLY);
    }

    return new Result(response, BroadCastType.ALL, wsId);
}

const playerLeaveHandler = (event, wsId, room) => genericHandler(event, wsId, room, false);
const spectatorLeaveHandler = (event, wsId, room) => genericHandler(event, wsId, room, true);

export { playerLeaveHandler, spectatorLeaveHandler };
