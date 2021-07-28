const router = require('express').Router();
const { Task, Employee } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/new/:id', withAuth, async (req, res) => {
  try {
    const userData = await Employee.findOne({
      where: {
        id: req.body.employee_id
      }
    });
    const taskData = await Task.create({
      name: req.body.name,
      project_id: req.params.id,
      task_user: userData.dataValues.username,
      employee_id: req.body.employee_id
    });

    res.status(200).json(taskData)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    await Task.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(200).json({ message: "Task deleted!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;