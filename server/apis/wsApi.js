import { WebSocketServer } from "ws";

const run = (port) => {
    const wss = new WebSocketServer({ port });
    
    wss.on("connection", (ws) => {
        ws.on('message', (message) => {
            ws.send(`Server received: ${message}`);
        });
        
        ws.on('close', () => console.log('Client disconnected'));
    });

    console.log(`WebSocket app listening on ws://localhost:${port}`);
}

export default { run };
