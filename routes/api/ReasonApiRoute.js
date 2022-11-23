const express = require('express');
const router = express.Router();

const reasonApiController = require('../../api/ReasonAPI');

router.get('/', reasonApiController.getReasons);
router.get('/:IdReason', reasonApiController.getReasonById);
router.post('/', reasonApiController.createReason);
router.put('/:IdReason', reasonApiController.updateReason);
router.delete('/:IdReason', reasonApiController.deleteReason);

module.exports = router;