import express from "express";
import { resolve } from "node:path";

const options = { root: resolve("dist") }

const run = (port) => {
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

  app.listen(port, () => {
    console.log(`Express app listening on http://localhost:${port}`);
  });
}

export default { run };
