require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const initDb = require("./db/initDb");
const { initSocket } = require("./sockets/socketManager");
const startHttpMonitorScheduler = require("./scheduler/httpMonitorScheduler");

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

async function startServer() {
    try {
        await initDb();

        initSocket(io);
        startHttpMonitorScheduler();

        server.listen(PORT, () => { 
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);

    }
}

startServer();