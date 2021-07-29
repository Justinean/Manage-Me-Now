const router = require('express').Router();
const { Employee, Project } = require('../models');
const withAuth = require('../utils/auth');

// This route will get the home page.
router.get('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll();
    const projects = await projectData.map((project) => project.get({ plain: true }));

    const managerData = await Employee.findAll({
      where: {
        is_manager: true
      }
    });
    const managers = await managerData.map((manager) => manager.get({ plain: true }));

    const employeeData = await Employee.findAll({
      where: {
        is_manager: false
      }
    });
    const employees = await employeeData.map((employee) => employee.get({ plain: true }));

    res.render('home', {
      employees,
      managers,
      projects,
      isMgr: req.session.mgr,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This route gets the login page.
router.get('/login', (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('login');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This route gets the signup page.
router.get('/signup', (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('signup', {
      signup: true
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

module.exports = router;