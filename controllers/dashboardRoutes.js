const router = require('express').Router();
const { ProjectEmployee, Project, Task, Employee } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', /* withAuth, */ async (req, res) => {
    try {
        console.log("Trying to get the dashboard.")
        const projectEmployee = await ProjectEmployee.findAll({
            where: {
                employee_id: req.session.userId
            }
        });
        const projectArray = [];
        for (i in projectEmployee) {
            const projectData = await Project.findOne({
                where: {
                    id: projectEmployee[i].dataValues.project_id
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
            isMgr: req.session.mgr,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/newProject', async (req, res) => {
    const projectEmployee = await ProjectEmployee.findAll({
        where: {
            employee_id: req.session.userId
        }
    });
    const projectArray = [];
    for (i in projectEmployee) {
        const projectData = await Project.findOne({
            where: {
                id: projectEmployee[i].dataValues.project_id
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
        isMgr: req.session.mgr,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        newProject: true
    });
});

router.get('/:id', withAuth, async (req, res) => {
    const employeeData = await Employee.findByPk(req.params.id)
    const projectEmployee = await ProjectEmployee.findAll({
        where: {
            employee_id: req.params.id
        }
    });
    const projectArray = [];
    for (i in projectEmployee) {
        const projectData = await Project.findOne({
            where: {
                id: projectEmployee[i].dataValues.project_id
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
        isMgr: req.session.mgr,
        loggedIn: req.session.loggedIn,
        username: employeeData.dataValues.username
    });
});

module.exports = router;