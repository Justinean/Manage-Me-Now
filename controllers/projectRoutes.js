const router = require('express').Router();
const { Employee, Project, ProjectEmployee, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  const projectEmployee = await ProjectEmployee.findAll({
    where: {
      employee_id: req.session.userId
    }
  });
  const projectArray = [];
  for (i in projectEmployee) {
    const projectData = await Project.findOne({
      where: {
        id: projectEmployee[i].dataValues.project_id
      }
    });
    projectArray.push(projectData);
  };
  const projects = await projectArray.map((project) => project.get({ plain: true }));

  const employeesOnProject = await ProjectEmployee.findAll({
    where: {
      project_id: req.params.id
    }
  });
  const employeeArray = [];
  for (x in employeesOnProject) {
    const employeeData = await Employee.findOne({
      where: {
        id: employeesOnProject[x].dataValues.employee_id
      }
    });
    employeeArray.push(employeeData);
  };
  const employees = await employeeArray.map((employee) => employee.get({ plain: true }));

  const taskData = await Task.findAll({
    where: {
      project_id: req.params.id
    }
  });
  const tasks = await taskData.map((task) => task.get({ plain: true }));

  res.render('project', {
    employees,
    projects,
    tasks,
    isMgr: req.session.mgr
  });
});

module.exports = router;