import express from "express";
import { resolve } from "node:path";

const HTTP_PORT = 8080;
const options = { root: resolve("dist") }

const run = () => {
  const app = express();

  app.use(express.static("dist"));

  app.get("/", (req, res) => {
    res.sendFile("index.html", options);
  });

  app.get("/rooms/:id", (req, res) => {
    res.sendFile("room.html", options);
  });

  app.post("/rooms", (req, res) => {
    res.status(201).send("ROOM_CREATED");
  });

  app.listen(HTTP_PORT, () => {
    console.log(`Express app listening on http://localhost:${HTTP_PORT}`);
  });
}

export default { run };
