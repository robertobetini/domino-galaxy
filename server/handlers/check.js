import { EventTypes, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastTypes } from "../models/result.js";
import { Spectator } from "../models/spectator.js";

import roomRepository from "../repositories/roomRepository.js";

const genericHandler = (event, wsId, room, isSpectator) => {
    let response = new GameEvent({
        roomId: room.id,
        type: isSpectator ? EventTypes.SPEC_LIST : EventTypes.PLAYER_LIST,
        content: (isSpectator ? room.game.spectators.map(s => s.id) : room.game.players.map(p => p.id)).join(",")
    });

    if (!room.entityIsInRoom(wsId)) {
        const response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: "not authorized to check for players"
        });
    }

    return new Result(response, BroadCastTypes.SENDER_ONLY);
}

const playerCheckHandler = (event, wsId, room) => genericHandler(event, wsId, room, false);
const spectatorCheckHandler = (event, wsId, room) => genericHandler(event, wsId, room, true);

export { playerCheckHandler, spectatorCheckHandler };
