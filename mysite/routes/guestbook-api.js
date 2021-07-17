const express = require('express');
const auth = require('./auth');
const controller = require('../controllers/guestbook-api');

const router = express.Router();
router.route('').get(controller.read);
router.route('/:no').delete(controller.delete);
router.route('/add').post(controller.add);


module.exports = router;