const Employee = require('./Employee');
const Project = require('./Project');
const ProjectEmployee = require('./ProjectEmployee');
const Task = require('./Task');

Task.belongsTo(Project, {
  foreignKey: 'project_id',
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Project.hasMany(Task, {
  foreignKey: 'project_id'
});

Task.belongsTo(Employee, {
  foreignKey: 'employee_id',
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Employee.hasMany(Task, {
  foreignKey: 'employee_id'
});

Project.belongsToMany(Employee, {
  through: ProjectEmployee
});

Employee.belongsToMany(Project, {
  through: ProjectEmployee
});

module.exports = {
  Project,
  Task,
  Employee,
  ProjectEmployee,
};
