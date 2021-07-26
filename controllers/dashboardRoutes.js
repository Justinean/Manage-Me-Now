const router = require('express').Router();
const { ProjectEmployee, Project, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    const projectEmployee = await ProjectEmployee.findAll({
        where: {
            employee_id: req.session.userId
        }
    });
    const projectArray = [];
    for (i in projectEmployee) {
        const projectData = await Project.findAll({
            where: {
                id: projectEmployee[i].dataValues.id
            }
        });
        projectArray.push(projectData);
    };
    const projects = await projectArray.map((project) => project.get({ plain: true }));

    const taskData = await Task.findAll({
        where: {
            employee_id: req.session.userId
        }
    });
    const tasks = await taskData.map((task) => task.get({ plain: true }));

    res.render('dashboard', {
        projects,
        tasks,
        isMgr: req.session.mgr
    });
});

router.get('/:id', withAuth, async (req, res) => {
    const projectEmployee = await ProjectEmployee.findAll({
        where: {
            employee_id: req.params.id
        }
    });
    const projectArray = [];
    for (i in projectEmployee) {
        const projectData = await Project.findAll({
            where: {
                id: projectEmployee[i].dataValues.id
            }
        });
        projectArray.push(projectData);
    };
    const projects = await projectArray.map((project) => project.get({ plain: true }));

    const taskData = await Task.findAll({
        where: {
            employee_id: req.params.id
        }
    });
    const tasks = await taskData.map((task) => task.get({ plain: true }));

    res.render('dashboard', {
        projects,
        tasks,
        isMgr: req.session.mgr
    });
});

router.get('/newProject', async (req, res) => {
    const projectEmployee = await ProjectEmployee.findAll({
        where: {
            employee_id: req.session.userId
        }
    });
    const projectArray = [];
    for (i in projectEmployee) {
        const projectData = await Project.findAll({
            where: {
                id: projectEmployee[i].dataValues.id
            }
        });
        projectArray.push(projectData);
    };
    const projects = await projectArray.map((project) => project.get({ plain: true }));

    const taskData = await Task.findAll({
        where: {
            employee_id: req.session.userId
        }
    });
    const tasks = await taskData.map((task) => task.get({ plain: true }));

    res.render('dashboard', {
        projects,
        tasks,
        newProject: true,
        isMgr: req.session.mgr
    });
});

module.exports = router;