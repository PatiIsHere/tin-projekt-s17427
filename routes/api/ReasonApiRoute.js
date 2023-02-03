const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth')

const reasonApiController = require('../../api/ReasonAPI');

router.get('/', isAuth, reasonApiController.getReasons);
router.get('/:IdReason', isAuth, reasonApiController.getReasonById);
router.post('/', isAuth, reasonApiController.createReason);
router.put('/:IdReason', isAuth, reasonApiController.updateReason);
router.delete('/:IdReason', isAuth, reasonApiController.deleteReason);

module.exports = router;