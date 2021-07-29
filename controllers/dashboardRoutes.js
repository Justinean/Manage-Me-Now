const router = require('express').Router();
const { Employee, Project, ProjectEmployee, Task } = require('../models');
const withAuth = require('../utils/auth');

// Node module is important for checking if hosted images exist, so a placeholder can be used instead.
const fetch = require("node-fetch");
let imageExists;
let imageId;

// This route will load the basic dashboard for the current user.
router.get('/', withAuth, async (req, res) => {
  try {
    imageId = req.session.userId;
    const response = await fetch(`https://manage-me-now-images.s3.us-east-2.amazonaws.com/${imageId}.jpg`, {
      method: 'HEAD'
    });
    if (response.ok) {
      imageExists = true;
    } else {
      imageExists = false;
    }

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

    const taskData = await Task.findAll({
      where: {
        employee_id: req.session.userId
      }
    });
    const tasks = await taskData.map((task) => task.get({ plain: true }));

    res.render('dashboard', {
      imageExists,
      imageId,
      projects,
      tasks,
      email: req.session.email,
      isMgr: req.session.mgr,
      loggedIn: req.session.loggedIn,
      myDash: true,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This route renders the dashboard again but with the add project section viewable.
router.get('/newProject', async (req, res) => {
  try {
    imageId = req.session.userId;
    const response = await fetch(`https://manage-me-now-images.s3.us-east-2.amazonaws.com/${imageId}.jpg`, {
      method: 'HEAD'
    });
    if (response.ok) {
      imageExists = true;
    } else {
      imageExists = false;
    }

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

    const taskData = await Task.findAll({
      where: {
        employee_id: req.session.userId
      }
    });
    const tasks = await taskData.map((task) => task.get({ plain: true }));

    res.render('dashboard', {
      imageExists,
      imageId,
      projects,
      tasks,
      email: req.session.email,
      isMgr: req.session.mgr,
      loggedIn: req.session.loggedIn,
      myDash: true,
      newProject: true,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This route will get a specific dashboard based on the user selected.
router.get('/:id', withAuth, async (req, res) => {
  try {
    let myDash;
    if (req.params.id == req.session.userId) {
      myDash = true;
    } else {
      myDash = false;
    }

    imageId = req.params.id;
    const response = await fetch(`https://manage-me-now-images.s3.us-east-2.amazonaws.com/${imageId}.jpg`, {
      method: 'HEAD'
    });
    if (response.ok) {
      imageExists = true;
    } else {
      imageExists = false;
    }

    const employeeData = await Employee.findByPk(req.params.id)
    const projectEmployee = await ProjectEmployee.findAll({
      where: {
        employee_id: req.params.id
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

    const taskData = await Task.findAll({
      where: {
        employee_id: req.params.id
      }
    });
    const tasks = await taskData.map((task) => task.get({ plain: true }));

    res.render('dashboard', {
      imageExists,
      imageId,
      myDash,
      projects,
      tasks,
      email: employeeData.dataValues.email,
      isMgr: req.session.mgr,
      loggedIn: req.session.loggedIn,
      username: employeeData.dataValues.username
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;