require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const initDb = require("./db/initDb");

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

async function startServer() {
    try {
        await initDb();

        server.listen(PORT, () => { 
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);

    }
    
}

startServer();