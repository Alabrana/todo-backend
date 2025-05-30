import { Server } from "socket.io";

let io: Server;

export const initSocketIO = (serverIO: Server) => {
  io = serverIO;
};

export const getIO = () => io;
