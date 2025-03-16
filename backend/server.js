const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend connection
    methods: ["GET", "POST"]
  }
});

let players = {}; // Store players in the lobby

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Handle joining the lobby
  socket.on("joinLobby", (playerName) => {
    players[socket.id] = { id: socket.id, name: playerName };
    io.emit("updateLobby", Object.values(players)); // Send updated player list
  });

  // Handle player disconnecting
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit("updateLobby", Object.values(players));
  });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
