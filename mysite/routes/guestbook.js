const express = require('express');
const auth = require('./auth');
const controller = require('../controllers/guestbook');

const router = express.Router();
router.route('').get(controller.index);
router.route('/add').post(controller.add);
router.route('/delete/:no').get(controller.delete);
router.route('/delete').post(controller._delete);

module.exports = router;