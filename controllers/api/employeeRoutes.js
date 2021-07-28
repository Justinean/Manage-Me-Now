const router = require('express').Router();
const { Employee } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const employeeData = await Employee.create(req.body);

    req.session.save(() => {
      req.session.userId = employeeData.dataValues.id;
      req.session.username = employeeData.dataValues.username;
      req.session.email = employeeData.dataValues.email;
      req.session.mgr = employeeData.dataValues.is_manager;
      req.session.loggedIn = true;

      res.json({ user: employeeData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const employeeData = await Employee.findOne({
      where: { username: req.body.username }
    });
    if (!employeeData) {
      res.status(400).json({ message: "Incorrect username or password; please try again." });
      return;
    }

    const validPW = await employeeData.checkPassword(req.body.password);
    if (!validPW) {
      res.status(400).json({ message: "Incorrect username or password; please try again." });
      return;
    }

    req.session.save(() => {
      req.session.userId = employeeData.dataValues.id;
      req.session.username = employeeData.dataValues.username;
      req.session.email = employeeData.dataValues.email;
      req.session.mgr = employeeData.dataValues.is_manager;
      req.session.loggedIn = true;

      res.json({ user: employeeData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;