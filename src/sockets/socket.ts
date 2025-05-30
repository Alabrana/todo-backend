import { Socket } from "socket.io";

export const registerSocketEvents = (socket: Socket) => {
  // Cliente puede unirse a una sala específica de tarea
  socket.on("join-task", (taskId: number) => {
    const room = `task-${taskId}`;
    socket.join(room);
    console.log(`Socket ${socket.id} joined ${room}`);
  });

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
};
