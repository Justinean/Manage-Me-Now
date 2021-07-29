const sequelize = require('../config/connection');
const { Employee, Project, ProjectEmployee, Task } = require('../models');

const employeeData = require('./employeeData.json');
const projectData = require('./projectData.json');
const projectEmployeeData = require('./projectEmployeeData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
  try {

    await sequelize.sync({ force: true });

    const allEmployees = await Employee.bulkCreate(employeeData, {
      individualHooks: true,
      returning: true,
    });

    const projects = await Project.bulkCreate(projectData, {
      returning: true
    });

    const employees = await Employee.findAll({
      where: {
        is_manager: false
      }
    });

    await ProjectEmployee.bulkCreate(projectEmployeeData);

    for (const i in projects) {
      for (let j = 0; j < employees.length; j++) {
        await ProjectEmployee.create({
          project_id: projects[i].id,
          employee_id: employees[j].id
        });
      }
    }

    for (const task of taskData) {
      let randomNumber = allEmployees[Math.floor(Math.random() * allEmployees.length)].id;
      const employeeData = await Employee.findByPk(randomNumber);

      await Task.create({
        ...task,
        project_id: projects[Math.floor(Math.random() * projects.length)].id,
        employee_id: randomNumber,
        task_user: employeeData.dataValues.username
      });
    }

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

seedDatabase();