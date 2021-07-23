const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProjectEmployee extends Model {}

ProjectEmployee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "project",
                key: 'id',
            }
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
        modelName: 'project_employee',
    }
)

module.exports = ProjectEmployee;