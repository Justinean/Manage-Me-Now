const router = require('express').Router();
const { Employee, Project, ProjectEmployee } = require('../../models');

router.post('/new', async (req, res) => {
  try {
    const projectData = await Project.create(req.body.name);
    await ProjectEmployee.create({
      project_id: projectData.dataValues.id,
      employee_id: req.session.userId
    });
    res.json(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/edit', async (req, res) => {
  try {
    const projectData = await Project.findOne({where: {name: req.body.name}});
    const employeeData = await Employee.findOne({where: {username: req.body.username}});
    await ProjectEmployee.create({
      project_id: projectData.dataValues.id,
      employee_id: employeeData.dataValues.id
    });
    res.json(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete', async (req, res) => {
  try {
    await Project.destroy({where: {name: req.body.name}})
    res.json(200).json({message: "Project deleted!"});
  } catch (err) {
    res.status(400).json(err);
  }
  
})

module.exports = router;