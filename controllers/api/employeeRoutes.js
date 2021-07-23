const router = require('express').Router();
const { Employee } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const employeeData = await Employee.create(req.body);

    req.session.save(() => {
      req.session.userId = employeeData.dataValues.id;
      req.session.username = employeeData.dataValues.username;
      req.session.mgr = employeeData.dataValues.isMgr;
      req.session.loggedIn = true;

      res.status(200).json(employeeData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;