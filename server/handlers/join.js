import { EventType, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastType } from "../models/result.js";
import { Spectator } from "../models/spectator.js";

import roomRepository from "../repositories/roomRepository.js";

const genericHandler = (event, wsId, room, isSpectator) => {
    let response = new GameEvent({
        roomId: event.roomId,
        type: EventType.ROOM_JOINED,
        content: wsId
    });

    const isSuccess = isSpectator 
        ? room.addSpectator(new Spectator({ id: wsId }))
        : room.addPlayer(new Player({ id: wsId }));

    if (!isSuccess) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventType.ERROR,
            content: "spectator/player already joined room"
        });

        return new Result(response, BroadCastType.SENDER_ONLY);
    }

    if (isSpectator) {
        response.content += ",spec";
    }
    else if (room.owner == wsId) {
        response.content += ",owner";
    }
    else {
        response.content += ",player";
    }

    return new Result(response, BroadCastType.ALL);
}

const playerJoinHandler = (event, wsId, room) => genericHandler(event, wsId, room, false);
const spectatorJoinHandler = (event, wsId, room) => genericHandler(event, wsId, room, true);

export { playerJoinHandler, spectatorJoinHandler };
