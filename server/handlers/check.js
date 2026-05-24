import { EventType, GameEvent } from "../../shared/models/events.js";
import { Player } from "../models/player.js";
import { Result, BroadCastType } from "../models/result.js";
import { Spectator } from "../models/spectator.js";

import roomRepository from "../repositories/roomRepository.js";

const genericHandler = (event, wsId, room, isSpectator) => {
    let response = new GameEvent({
        roomId: room.id,
        type: isSpectator ? EventType.SPEC_LIST : EventType.PLAYER_LIST,
        content: (isSpectator ? room.game.spectators.map(s => s.id) : room.game.players.map(p => p.id)).join(",")
    });

    if (!room.entityIsInRoom(wsId)) {
        const response = new GameEvent({
            roomId: event.roomId,
            type: EventType.ERROR,
            content: "not authorized to check for players"
        });
    }

    return new Result(response, BroadCastType.SENDER_ONLY);
}

const playerCheckHandler = (event, wsId, room) => genericHandler(event, wsId, room, false);
const spectatorCheckHandler = (event, wsId, room) => genericHandler(event, wsId, room, true);

export { playerCheckHandler, spectatorCheckHandler };
