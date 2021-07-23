// import models
const Project = require('./Project');
const Task = require('./Task');
const Employee = require('./Employee');
const ProjectEmployee = require('./ProjectEmployee');

Task.belongsTo(Project, { foreignKey: 'project_id', onDelete: "CASCADE", onUpdate: "CASCADE" });
Project.hasMany(Task, { foreignKey: 'project_id' });
Project.belongsToMany(Employee, { through: ProjectEmployee });
Employee.belongsToMany(Project, { through: ProjectEmployee });

module.exports = {
    Project,
    Task,
    Employee,
    ProjectEmployee,
};
