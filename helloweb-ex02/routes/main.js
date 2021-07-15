const express = require('express');

const router = express.Router(); // chain 안걸림
router.route("").get(function(req, res){
    res.render('main/index');
});
module.exports = router;
// exports = mainRouter 하면 외부에서 mainRouter.mainRouter.~해야한대