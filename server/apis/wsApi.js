import { WebSocketServer } from "ws";

const WS_PORT = 8081

const run = () => {
    const wss = new WebSocketServer({ port: WS_PORT });
    
    wss.on("connection", (ws) => {
        ws.on('message', (message) => {
            ws.send(`Server received: ${message}`);
        });
        
        ws.on('close', () => console.log('Client disconnected'));
    });

    console.log(`WebSocket app listening on ws://localhost:${WS_PORT}`);
}

export default { run };
