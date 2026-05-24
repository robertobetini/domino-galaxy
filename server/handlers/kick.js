import { EventType, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastType } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

const genericHandler = (event, wsId, room, isSpectator) => {
    const playerToKick = parseInt(event.content);
    
    let response = new GameEvent({
        roomId: event.roomId,
        type: EventType.ROOM_LEFT,
        content: playerToKick
    });

    if (playerToKick == room.owner) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventType.ERROR,
            content: "cannot kick room owner"
        });

        return new Result(response, BroadCastType.SENDER_ONLY);
    }

    if (wsId != room.owner) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventType.ERROR,
            content: "kick is permitted only by room owner"
        });

        return new Result(response, BroadCastType.SENDER_ONLY);
    }

    const isSuccess = isSpectator ? room.removeSpectator(playerToKick) : room.removePlayer(playerToKick);
    if (!isSuccess) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventType.ERROR,
            content: "spectator/player not found"
        });

        return new Result(response, BroadCastType.SENDER_ONLY);
    }

    return new Result(response, BroadCastType.ALL, playerToKick);
}

const playerKickHandler = (event, wsId, room) => genericHandler(event, wsId, room, false);
const spectatorKickHandler = (event, wsId, room) => genericHandler(event, wsId, room, true);

export { playerKickHandler, spectatorKickHandler };
