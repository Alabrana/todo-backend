import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import { StatusEnum } from "../enums.js";

export interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  status: string;
  dateCreate: Date;
  dateUpdate: Date;
}

export interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id" | "dateCreate" | "dateUpdate"> {}

export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public dateCreate!: Date;
  public dateUpdate!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: StatusEnum.Pendiente,
    },
    dateCreate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dateUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
  }
);
