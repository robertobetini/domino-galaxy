import { WebSocketServer } from "ws";

import utils from "../../shared/utils.js";

import { GameEvent, EventTypes } from "../../shared/models/events.js";
import { BroadCastTypes } from "../models/result.js";

import roomRepository from "../repositories/roomRepository.js";

import defaultHandler from "../handlers/default.js";
import playerJoinHandler from "../handlers/playerJoin.js";

const MAX_MESSAGE_BYTE_LENGTH = 1024;

const wsMap = new Map();
const handlerMap = new Map([
    [EventTypes.UNKNOWN, defaultHandler],
    [EventTypes.PLAYER_JOIN, playerJoinHandler]
]);

const sendToRoom = (roomId, clients, response, sender=null) => {
    const room = roomRepository.get(roomId);

    for(const client of clients) {
        const clientId = wsMap.get(client);
        const clientIsInRoom = room.game.players.find(p => p.id == clientId) !== undefined;

        if (client === sender || !clientIsInRoom) {
            continue;
        }

        client.send(response);
    }
}

const run = (port) => {
    const wss = new WebSocketServer({ port });
    
    wss.on("connection", (ws) => {
        wsMap.set(ws, utils.randomNumber());
        
        ws.on('message', (message) => {
            if (message.byteLength > MAX_MESSAGE_BYTE_LENGTH) {
                ws.send("message exceeded max length");
                return;
            }

            const wsId = wsMap.get(ws);
            const decodedEvent = message.toString("utf-8");
            const event = GameEvent.fromString(decodedEvent);
            
            console.log(`Received event of type '${event.type}' : ${event}`);

            const entry = handlerMap.get(event.type);
            const result = entry?.handler(event, wsId);
            const response = result?.response?.toString() ?? "";

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
        });
        
        ws.on('close', () => {
            console.log('Client disconnected');
            wsMap.delete(ws);
        });
    });

    console.log(`WebSocket app listening on ws://localhost:${port}`);
    return wss;
}

export default { run };
