const http = require('http');
const app = require("./app");
const { Server } = require("socket.io");
const setupSocketIO = require('./services/socketService');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Set up Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Set up socket handlers
setupSocketIO(io);

server.listen(port, () => console.log(`Server is running on port ${port}`));
