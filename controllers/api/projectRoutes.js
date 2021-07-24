const router = require('express').Router();
const { Employee, Project, ProjectEmployee } = require('../../models');

router.post('/project', async (req, res) => {
  try {
    const projectData = await Project.create(req.body.name);
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

router.post('/project/employee', async (req, res) => {
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

module.exports = router;