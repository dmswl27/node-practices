const express = require('express');
const controller = require('../../controllers/admin/main');

const router = express.Router();
router.route('').get(controller.index);
router.route('/update').post(controller.update);


module.exports = router;