const express = require('express');
const router = express.Router();
const reasonController = require('../controllers/reasonController');

router.get('/', reasonController.showReasonList);
router.get('/add', reasonController.showAddReasonForm);
router.get('/details/:reasonId', reasonController.showReasonDetails);

module.exports = router;