import { WebSocketServer } from "ws";

import utils from "../../shared/utils.js";

import { GameEvent, EventTypes } from "../../shared/models/events.js";
import { BroadCastTypes } from "../models/result.js";
import { Result } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

import defaultHandler from "../handlers/default.js";
import { playerJoinHandler, spectatorJoinHandler } from "../handlers/join.js";
import { playerLeaveHandler, spectatorLeaveHandler } from "../handlers/leave.js";
import { playerCheckHandler, spectatorCheckHandler } from "../handlers/check.js";

const MAX_MESSAGE_BYTE_LENGTH = 1024;

const wsMap = new Map();
const handlerMap = new Map([
    [EventTypes.UNKNOWN, defaultHandler],
    [EventTypes.PLAYER_JOIN, playerJoinHandler],
    [EventTypes.SPEC_JOIN, spectatorJoinHandler],
    [EventTypes.PLAYER_LEAVE, playerLeaveHandler],
    [EventTypes.SPEC_LEAVE, spectatorJoinHandler],
    [EventTypes.CHECK_PLAYERS, playerCheckHandler],
    [EventTypes.CHECK_SPECS, spectatorCheckHandler],
]);

const sendToRoom = (roomId, clients, response, sender=null) => {
    const room = roomRepository.get(roomId);

    for(const client of clients) {
        const clientId = wsMap.get(client);
        const clientIsInRoom = room.game.players.find(p => p.id == clientId) !== undefined 
            || room.game.spectators.find(s => s.id == clientId) !== undefined;

        if (client === sender || !clientIsInRoom) {
            continue;
        }

        client.send(response);
    }
}

const validateAndHandle = (handler, event, wsId) => {
    const room = roomRepository.get(event.roomId);
    if (!room) {
        const response = new GameEvent({
            roomId: event.roomId,
            type: EventTypes.SERVER_ERROR,
            content: `room does not exist`
        });

        return new Result(response, BroadCastTypes.SENDER_ONLY);
    }

    return handler(event, wsId, room);
}

const handleMessage = (ws, message) => {
    const wsId = wsMap.get(ws);
    const decodedEvent = message.toString("utf-8");
    const event = GameEvent.fromString(decodedEvent);
    
    console.log(`[CLIENT_EVENT] '${event.type}' : ${event}`);

    const handler = handlerMap.get(event.type);
    const result = validateAndHandle(handler, event, wsId);
    const response = result?.response?.toString() ?? "";

    console.log(`[SERVER_EVENT] ${result.response.type} (BC - ${result.broadcastType}): ${result.response}`);

    if (result.shouldDisconnectClient) {
        ws.close(1000);
    }

    switch (result.broadcastType) {
        case BroadCastTypes.SENDER_ONLY: 
            ws.send(response);
            break;
        case BroadCastTypes.ALL_BUT_SENDER:
            sendToRoom(event.roomId, wss.clients, response, wsId);
            break;
        case BroadCastTypes.ALL:
            sendToRoom(event.roomId, wss.clients, response);
            break;
        case BroadCastTypes.NO_RESPONSE:
        default: break;
    }
}

const run = (port) => {
    const wss = new WebSocketServer({ port });
    
    wss.on("connection", (ws) => {
        wsMap.set(ws, utils.randomNumber());

        ws.on("message", (message) => message.byteLength > MAX_MESSAGE_BYTE_LENGTH ? ws.send("message exceeded max length") : handleMessage(ws, message));
        ws.on("close", () => wsMap.delete(ws));
    });

    console.log(`WebSocket app listening on ws://localhost:${port}`);
    return wss;
}

export default { run };
