import { StatusEnum } from "../enums.js";
import { Task, TaskCreationAttributes } from "../models/task.model.js";

export const getAllTasks = async (): Promise<Task[]> => {
  return Task.findAll();
};

export const getTaskById = async (id: number): Promise<Task | null> => {
  return Task.findByPk(id);
};

export const createTask = async (
  data: Pick<TaskCreationAttributes, "title" | "description">
): Promise<Task> => {
  return Task.create({
    title: data.title,
    description: data.description,
    status: StatusEnum.Pendiente,
  });
};

export const updateTaskStatus = async (
  id: number,
  status: StatusEnum
): Promise<Task | null> => {
  const task = await Task.findByPk(id);

  if (!task) return null;

  task.status = status;
  task.dateUpdate = new Date();
  await task.save();

  return task;
};

export const deleteTask = async (id: number): Promise<number> => {
  return Task.destroy({ where: { id } });
};
