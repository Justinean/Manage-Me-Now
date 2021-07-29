const router = require('express').Router();
const { Project, ProjectEmployee } = require('../../models');
const withAuth = require('../../utils/auth');

// This route will post a new project.
router.post('/new', withAuth, async (req, res) => {
  try {
    const projectData = await Project.create(req.body);

    await ProjectEmployee.create({
      project_id: projectData.dataValues.id,
      employee_id: req.session.userId
    });

    res.json(200).json(projectData);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// This route will edit projects by adding employees to it.
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    await ProjectEmployee.create({
      project_id: req.params.id,
      employee_id: req.body.employee_id
    });

    res.json(200).json({ message: "You've added an employee!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This route removes an employee from a project.
router.delete('/remove/employee/:id', withAuth, async (req, res) => {
  try {
    await ProjectEmployee.destroy({
      where: {
        employee_id: req.params.id,
        project_id: req.body.projectId
      }
    });

    res.json(200).json({ message: "Project deleted!" });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// This route will delete a project.
router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json(200).json({ message: "Project deleted!" });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;