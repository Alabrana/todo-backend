import express from "express";
import { sequelize } from "./db/sequelize.js";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors";

import http from "http";
import { Server } from "socket.io";
import { initSocketIO } from "./sockets/io.js";
import { registerSocketEvents } from "./sockets/socket.js";

const PORT = 3000;
const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

initSocketIO(io);

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (_req, res) => {
  res.send("Ejecutando el servidor de Express");
});

// Conexión WebSocket
io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  registerSocketEvents(socket);
});

//  Sync DB
sequelize.sync().then(() => {
  console.log("Database sync");
  server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });
});
