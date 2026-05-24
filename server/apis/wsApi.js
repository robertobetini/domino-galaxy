import { WebSocketServer } from "ws";

import utils from "../../shared/utils.js";

import { BiMap } from "../../shared/bimap.js";

import { GameEvent, EventType } from "../../shared/models/events.js";
import { BroadCastType } from "../models/result.js";
import { Result } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

import defaultHandler from "../handlers/default.js";
import { playerJoinHandler, spectatorJoinHandler } from "../handlers/join.js";
import { playerLeaveHandler, spectatorLeaveHandler } from "../handlers/leave.js";
import { playerCheckHandler, spectatorCheckHandler } from "../handlers/check.js";
import { playerKickHandler, spectatorKickHandler } from "../handlers/kick.js";

const MAX_MESSAGE_BYTE_LENGTH = 1024;

const wsMap = new BiMap();
const handlerMap = new Map([
    [EventType.UNKNOWN, defaultHandler],
    [EventType.PLAYER_JOIN, playerJoinHandler],
    [EventType.SPEC_JOIN, spectatorJoinHandler],
    [EventType.PLAYER_LEAVE, playerLeaveHandler],
    [EventType.SPEC_LEAVE, spectatorJoinHandler],
    [EventType.CHECK_PLAYERS, playerCheckHandler],
    [EventType.CHECK_SPECS, spectatorCheckHandler],
    [EventType.PLAYER_KICK, playerKickHandler],
    [EventType.SPEC_KICK, spectatorKickHandler],
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
            type: EventType.ERROR,
            content: `room does not exist`
        });

        return new Result(response, BroadCastType.SENDER_ONLY);
    }

    return handler(event, wsId, room);
}

const handleMessage = (wss, ws, message) => {
    const wsId = wsMap.get(ws);
    const decodedEvent = message.toString("utf-8");
    const event = GameEvent.fromString(decodedEvent);
    
    console.log(`[CLIENT_EVENT] '${event.type}' : ${event}`);
    
    const handler = handlerMap.get(event.type) ?? defaultHandler;
    const result = validateAndHandle(handler, event, wsId);
    const response = result?.response?.toString() ?? "";

    console.log(`[SERVER_EVENT] ${result.response.type} (BC - ${result.broadcastType}): ${result.response}`);

    if (result.clientToBeDisconnected) {
        const wsToBeDisconnected = wsMap.revGet(result.clientToBeDisconnected);
        wsToBeDisconnected?.close(1000);
    }

    switch (result.broadcastType) {
        case BroadCastType.SENDER_ONLY: 
            ws.send(response);
            break;
        case BroadCastType.ALL_BUT_SENDER:
            sendToRoom(event.roomId, wss.clients, response, wsId);
            break;
        case BroadCastType.ALL:
            sendToRoom(event.roomId, wss.clients, response);
            break;
        case BroadCastType.NO_RESPONSE:
        default: break;
    }
}

const run = (port) => {
    const wss = new WebSocketServer({ port });
    
    wss.on("connection", (ws) => {
        const wsId = utils.randomNumber();
        wsMap.set(ws, wsId);

        ws.on("message", (message) => message.byteLength > MAX_MESSAGE_BYTE_LENGTH ? ws.send("message exceeded max length") : handleMessage(wss, ws, message));
        ws.on("close", () => wsMap.delete(ws));
    });

    console.log(`WebSocket app listening on ws://localhost:${port}`);
    return wss;
}

export default { run };
