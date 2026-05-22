import { EventTypes, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastTypes } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

const genericHandler = (event, wsId, room, isSpectator) => {
    const playerToKick = parseInt(event.content);
    
    let response = new GameEvent({
        roomId: event.roomId,
        type: EventTypes.ROOM_LEFT,
        content: playerToKick
    });

    if (playerToKick == room.owner) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: "cannot kick room owner"
        });

        return new Result(response, BroadCastTypes.SENDER_ONLY);
    }

    if (wsId != room.owner) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: "kick is permitted only by room owner"
        });

        return new Result(response, BroadCastTypes.SENDER_ONLY);
    }

    const isSuccess = isSpectator ? room.removeSpectator(playerToKick) : room.removePlayer(playerToKick);
    if (!isSuccess) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: "spectator/player not found"
        });

        return new Result(response, BroadCastTypes.SENDER_ONLY);
    }

    return new Result(response, BroadCastTypes.ALL, playerToKick);
}

const playerKickHandler = (event, wsId, room) => genericHandler(event, wsId, room, false);
const spectatorKickHandler = (event, wsId, room) => genericHandler(event, wsId, room, true);

export { playerKickHandler, spectatorKickHandler };
