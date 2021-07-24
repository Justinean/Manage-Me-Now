const router = require('express').Router();

const employeeRoutes = require('./employeeRoutes');
const projectRoutes = require("./projectRoutes")

router.use('/employee', employeeRoutes);
router.use('/project', projectRoutes)

module.exports = router;