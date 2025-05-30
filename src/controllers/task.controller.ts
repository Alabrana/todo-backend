import { Request, Response } from "express";

import * as taskService from "../services/task.service.js";

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
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
  const { description } = req.body;

  console.log("Creating task with description:", description);

  if (!description) {
    res.status(400).json({ error: "Description is required" });
    return;
  }

  const task = await taskService.createTask(description);

  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  console.log("Updating task with ID:", id, "to status:", status);

  const task = await taskService.updateTaskStatus(id, status);

  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await taskService.deleteTask(id);

  if (!deleted) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.status(204).send();
};
