io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); 
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", "A user is typing...");
  });

  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
