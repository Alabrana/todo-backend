import { Task } from "../models/task.model.js";

export const getAllTasks = () => Task.findAll();

export const getTaskById = (id: number) => Task.findByPk(id);

export const createTask = (description: string) => Task.create({ description });

export const updateTaskStatus = async (id: number, status: boolean) => {
  const task = await Task.findByPk(id);

  if (!task) return null;

  task.status = status;

  await task.save();

  return task;
};

export const deleteTask = (id: number) => Task.destroy({ where: { id } });
