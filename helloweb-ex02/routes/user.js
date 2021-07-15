const express = require('express');

const router = express.Router(); // chain 안걸림
router.route("/join").get(function(req, res){
    res.render('user/join');
});
router.route("/join").post(function(req, res){
    console.log(req.body);
    res.redirect("/"); // post
});
router.route("/api").get(function(req, res){
    console.log("gd");
    const vo = {
        no: 10,
        name: '페페',
        email: 'pepe@gmail.com',
        gender: '개구리'
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(vo));
});
module.exports = router;
// exports = mainRouter 하면 외부에서 mainRouter.mainRouter.~해야한대