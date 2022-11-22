const express = require('express');
const router = express.Router();

const empApiController = require('../../api/EmployeeAPI');

router.get('/', empApiController.getEmployees);

module.exports = router;