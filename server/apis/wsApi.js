import { WebSocketServer } from "ws";

import utils from "../../shared/utils.js";

import { GameEvent, EventTypes } from "../../shared/models/events.js";
import { BroadCastTypes } from "../models/result.js";

import defaultHandler from "../handlers/default.js";
import playerJoinHandler from "../handlers/playerJoin.js";

const wsMap = new Map();
const handlerMap = new Map([
    [EventTypes.UNKNOWN, defaultHandler],
    [EventTypes.PLAYER_JOIN, playerJoinHandler]
]);

const run = (port) => {
    const wss = new WebSocketServer({ port });
    
    wss.on("connection", (ws) => {
        wsMap.set(ws, utils.randomNumber());
        
        ws.on('message', (message) => {
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
                    for(const client of wss.clients) {
                        if (client == ws) {
                            continue;
                        }

                        client.send(response);
                    }

                    break;
                case BroadCastTypes.ALL:
                    for(const client of wss.clients) {
                        client.send(response);
                    }

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
}

export default { run };
