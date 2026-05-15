let ioInstance = null;

function initSocket(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function broadcastNewResponse(response) {
  if (!ioInstance) return;

  ioInstance.emit("new-http-response", response);
}

module.exports = {
  initSocket,
  broadcastNewResponse,
};
