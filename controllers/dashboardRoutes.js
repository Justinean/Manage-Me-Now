const { ProjectEmployee, Project, Task } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const projectEmployee = await ProjectEmployee.findAll({where: {employee_id: req.session.userId}});
    const projects = [];
    const tasks = await Task.findAll({where: {employee_id: req.session.userId}});
    for (i in projectEmployee) {
        const project = await Project.findAll({where: {id: projectEmployee[i].dataValues.id}});
        projects.push(project);
    };
    res.render('dashboard', {projects, tasks, isMgr: req.session.mgr})
});

router.get('/:id', async (req, res) => {
    const projectEmployee = await ProjectEmployee.findAll({where: {employee_id: req.params.id}});
    const projects = [];
    const tasks = await Task.findAll({where: {employee_id: req.params.id}});
    for (i in projectEmployee) {
        const project = await Project.findAll({where: {id: projectEmployee[i].dataValues.id}});
        projects.push(project);
    };
    res.render('dashboard', {projects, tasks, isMgr: req.session.mgr})
})

router.get('/newProject', async (req, res) => {

})

module.exports = router;