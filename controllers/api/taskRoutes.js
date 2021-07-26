const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/new', withAuth, async (req, res) => {
  try {
    const taskData = await Task.create(req.body.name);

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