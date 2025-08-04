const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const users = {}; 

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join room", ({ username, room }) => {
    socket.join(room);
    users[socket.id] = { username, room };


    socket.to(room).emit("notification", `${username} has joined the room.`);


    const roomUsers = getUsersInRoom(room);
    io.to(room).emit("room users", roomUsers);
  });

  socket.on("chat message", (msg) => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("chat message", {
        sender: user.username,
        text: msg,
      });
    }
  });

  socket.on("private message", ({ recipientId, message }) => {
    const sender = users[socket.id];
    if (sender) {
      socket.to(recipientId).emit("private message", {
        sender: sender.username,
        text: message,
      });
    }
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      socket.to(user.room).emit("notification", `${user.username} has left the room.`);
      delete users[socket.id];

      const roomUsers = getUsersInRoom(user.room);
      io.to(user.room).emit("room users", roomUsers);
    }
    console.log("Client disconnected:", socket.id);
  });
});

function getUsersInRoom(room) {
  return Object.entries(users)
    .filter(([id, user]) => user.room === room)
    .map(([id, user]) => ({ id, username: user.username }));
}

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
