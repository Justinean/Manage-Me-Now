const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const homeRoutes = require('./homeRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/project', projectRoutes);

module.exports = router;