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
    console.log(err)
    res.status(400).json(err);
  }
});

router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findOne({
      where: {
        id: req.params.id
      }
    });
    const employeeData = await Employee.findOne({
      where: {
        username: req.body.username
      }
    });
    await ProjectEmployee.create({
      project_id: projectData.dataValues.id,
      employee_id: employeeData.dataValues.id
    });
    res.json(200).json(projectData);
  } catch (err) {
    console.log(err)
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
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;