const router = require('express').Router();
const { Employee, Project, ProjectEmployee, Task } = require('../models');
const withAuth = require('../utils/auth');

// This route will render the currently requested project.
router.get('/:id', withAuth, async (req, res) => {
  // This gets all projects for the logged in Employee.
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

  // This will get the data for the current project.
  const currentProjectData = await Project.findOne({
    where: {
      id: req.params.id
    }
  });
  const currentProject = await currentProjectData.map((project) => project.get({ plain: true }));

  // This gets all employees currently assigned to the project.
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

  // This will get all tasks on the current project.
  const taskData = await Task.findAll({
    where: {
      project_id: req.params.id
    }
  });
  const tasks = await taskData.map((task) => task.get({ plain: true }));

  res.render('project', {
    currentProject,
    employees,
    projects,
    tasks,
    isMgr: req.session.mgr,
    loggedIn: req.session.loggedIn
  });
});

router.get('/addEmployee/:id', withAuth, async (req, res) => {
  // This gets all projects for the logged in Employee.
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

  // This will get the data for the current project.
  const currentProjectData = await Project.findOne({
    where: {
      id: req.params.id
    }
  });
  const currentProject = await currentProjectData.map((project) => project.get({ plain: true }));

  // This gets all employees currently assigned to the project.
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

  // This gets all employees in the database.
  const allEmployeeData = await Employee.findAll();
  const allEmployees = await allEmployeeData.map((all) => all.get({ plain: true }));

  // This will get all tasks on the current project.
  const taskData = await Task.findAll({
    where: {
      project_id: req.params.id
    }
  });
  const tasks = await taskData.map((task) => task.get({ plain: true }));

  res.render('project', {
    allEmployees,
    currentProject,
    employees,
    projects,
    tasks,
    addEmployee: true,
    isMgr: req.session.mgr,
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;