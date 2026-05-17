import express from 'express';

const HTTP_PORT = 8080;

const run = () => {
  const app = express();

  app.use(express.static("public"));
  app.use("/shared", express.static("shared"));

  app.get("/", (req, res) => {
    res.redirect("/index.html");
  });

  app.post("/rooms", (req, res) => {
    res.status(201).send("ROOM_CREATED");
  });

  app.listen(HTTP_PORT, () => {
    console.log(`Express app listening on http://localhost:${HTTP_PORT}`);
  });
}

export default { run };
