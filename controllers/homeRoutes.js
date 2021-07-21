const router = require('express').Router();
// const { User, Blog } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});