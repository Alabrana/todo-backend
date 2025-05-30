import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export class Task extends Model {
  declare id: number;
  declare description: string;
  declare status: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
  }
);
