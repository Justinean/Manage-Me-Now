const router = require('express').Router();

const employeeRoutes = require('./employeeRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/employees', employeeRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;