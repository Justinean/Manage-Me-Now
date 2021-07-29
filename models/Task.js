const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model { };

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "project",
        key: 'id',
      }
    },
    task_user: {
      type: DataTypes.STRING,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'task',
  }
);

module.exports = Task;