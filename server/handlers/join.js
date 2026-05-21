import { EventTypes, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastTypes } from "../models/result.js";
import { Spectator } from "../models/spectator.js";

import roomRepository from "../repositories/roomRepository.js";

const genericHandler = (event, wsId, room, isSpectator) => {
    let response = new GameEvent({
        roomId: event.roomId,
        type: EventTypes.ROOM_JOINED,
        content: wsId
    });

    const isSuccess = isSpectator 
        ? room.addSpectator(new Spectator({ id: wsId }))
        : room.addPlayer(new Player({ id: wsId }));

    if (!isSuccess) {
        response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: `${ isSpectator ? "spectator" : "player" } already joined room`
        });

        return new Result(response, BroadCastTypes.SENDER_ONLY);
    }

    return new Result(response, BroadCastTypes.ALL);
}

const playerJoinHandler = (event, wsId, room) => genericHandler(event, wsId, room, false);
const spectatorJoinHandler = (event, wsId, room) => genericHandler(event, wsId, room, true);

export { playerJoinHandler, spectatorJoinHandler };
