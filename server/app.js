import httpApi from "./apis/httpApi.js";
import wsApi from "./apis/wsApi.js";

const HTTP_PORT = 8080;
const WS_PORT = 8081;

const httpServer = httpApi.run(HTTP_PORT);
const wss = wsApi.run(WS_PORT);
