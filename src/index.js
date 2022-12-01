const express = require("express");

const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";
const { Server } = require("ws");

let ledOn = false;

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send(`${ledOn}`);

  ws.on("message", function message(data) {
    ledOn ? (ledOn = false) : (ledOn = true);
    console.log("ledOn", ledOn);
    wss.clients.forEach((client) => {
      client.send(`${ledOn}`);
    })
  
    ws.on("close", () => console.log("Client disconnected"));
});



});
