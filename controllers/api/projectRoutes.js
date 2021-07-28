const router = require('express').Router();
const { Employee, Project, ProjectEmployee } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/new', withAuth, async (req, res) => {
  try {
    const projectData = await Project.create(req.body);
    const projectEmployee = await ProjectEmployee.create({
      project_id: projectData.dataValues.id,
      employee_id: req.session.userId
    })
    console.log(projectData, projectEmployee)
    res.json(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/edit/:id', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    await ProjectEmployee.create({
      project_id: req.params.id,
      employee_id: req.body.employee_id
    });
    res.json(200).json({ message: "You've added an employee!"});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(200).json({ message: "Project deleted!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;