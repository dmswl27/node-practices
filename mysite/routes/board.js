const express = require('express');
const controller = require('../controllers/board');
const auth = require('./auth');

const router = express.Router();
router.route('/write').get(controller.write);
router.route('/write').post(controller._write);
router.route('/comment/:no').get(controller.comment);
router.route('/comment/:no').post(controller._comment);
router.route('/view/:no').get(controller.view);
router.route('/modify/:no').get(controller.modify);
router.route('/modify/:no').post(controller._modify);
router.route('/delete/:no').get(controller.delete);
router.route('/:pageNum').get( controller.list);

module.exports = router;