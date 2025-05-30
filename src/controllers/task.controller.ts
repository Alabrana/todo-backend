import { Request, Response } from "express";

import * as taskService from "../services/task.service.js";
import { getIO } from "../sockets/io.js";
import { Task } from "../models/task.model.js";

export const getTasks = async (
  _req: Request,
  res: Response<Task[]>
): Promise<void> => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json([]);
  }
};

export const getTasksById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = await taskService.getTaskById(id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  console.log("Creating task with description:", description);

  if (!title) {
    res.status(400).json({ error: "title is required" });
    return;
  }

  try {
    const task = await taskService.createTask({ title, description });
    // Emitir evento a todos
    getIO().emit("task-created", task);
    console.log("task-created emitido: ", task);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const task = await taskService.updateTaskStatus(id, status);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  // Emitir a sala específica
  getIO().to(`task-${id}`).emit("task-status-updated", { id });
  console.log(`task-status-updated emitido a ===> task-${id}`);

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await taskService.deleteTask(id);

  if (!deleted) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  getIO().to(`task-${id}`).emit("task-deleted", { id });
  console.log(`task-deleted emitido a task-${id}`);

  res.status(204).send();
};
