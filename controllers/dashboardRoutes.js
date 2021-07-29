const router = require('express').Router();
const { ProjectEmployee, Project, Task, Employee } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require("node-fetch");
let imageExists;
let imageId;

router.get('/', withAuth, async (req, res) => {
    try {
        imageId = req.session.userId;
        console.log(imageId);
        const response = await fetch(`https://manage-me-now-images.s3.us-east-2.amazonaws.com/${imageId}.jpg`, {
            method: 'HEAD'
        });
        if (response.ok) {
            console.log('Image exists.');
            imageExists = true;
        } else {
            console.log('Image does not exist.');
            imageExists = false;
        }
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
            imageExists,
            imageId,
            projects,
            tasks,
            email: req.session.email,
            isMgr: req.session.mgr,
            loggedIn: req.session.loggedIn,
            myDash: true,
            username: req.session.username
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/newProject', async (req, res) => {
    try {
        imageId = req.session.userId;
        console.log(imageId);
        const response = await fetch(`https://manage-me-now-images.s3.us-east-2.amazonaws.com/${imageId}.jpg`, {
            method: 'HEAD'
        });
        if (response.ok) {
            console.log('Image exists.');
            imageExists = true;
        } else {
            console.log('Image does not exist.');
            imageExists = false;
        }
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
            imageExists,
            imageId,
            projects,
            tasks,
            email: req.session.email,
            isMgr: req.session.mgr,
            loggedIn: req.session.loggedIn,
            myDash: true,
            newProject: true,
            username: req.session.username
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        imageId = req.params.id;
        console.log(imageId);
        const response = await fetch(`https://manage-me-now-images.s3.us-east-2.amazonaws.com/${imageId}.jpg`, {
            method: 'HEAD'
        });
        if (response.ok) {
            console.log('Image exists.');
            imageExists = true;
        } else {
            console.log('Image does not exist.');
            imageExists = false;
        }
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
            imageExists,
            imageId,
            projects,
            tasks,
            email: req.session.email,
            isMgr: req.session.mgr,
            loggedIn: req.session.loggedIn,
            username: employeeData.dataValues.username
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;