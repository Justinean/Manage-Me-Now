const router = require('express').Router();
const { Project, Employee } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  const projects = await Project.findAll();
  const managers = await Employee.findAll({
    where: {
      is_manager: true
    }
  });
  const employees = await Employee.findAll({
    where: {
      is_manager: false
    }
  });


  res.render('home', {
    projects,
    managers,
    employees,
    isMgr: req.session.mgr
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
})

module.exports = router;