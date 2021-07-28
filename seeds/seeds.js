const sequelize = require('../config/connection');
const { Employee, Project, Task, ProjectEmployee } = require('../models');

const employeeData = require('./employeeData.json');
const projectData = require('./projectData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const employees = await Employee.bulkCreate(employeeData, {
        individualHooks: true,
        returning: true,
    });

    const projects = await Project.bulkCreate(projectData, {
        returning: true
    })

    for (const i in projects) {
        for (let j = 0; j < employees.length; j++) {
            await ProjectEmployee.create({
                project_id: projects[i].id,
                employee_id: employees[j].id
            })
        }
    }

    for (const task of taskData) {
        let randomNumber = employees[Math.floor(Math.random() * employees.length)].id;
        const employeeData = await Employee.findByPk(randomNumber);
        await Task.create({
            ...task,
            project_id: projects[Math.floor(Math.random() * projects.length)].id,
            employee_id: randomNumber,
            task_user: employeeData.dataValues.username
        });
    }


    process.exit(0);
};

seedDatabase();