const express = require('express');
const auth = require('./auth');
const controller = require('../controllers/gallery');

const router = express.Router();
router.route('').get(controller.index);
router.route('/upload').post(auth('ADMIN'), controller.upload);
router.route('/delete/:no').get(auth('ADMIN'), controller.delete);

module.exports = router;