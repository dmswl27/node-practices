const express = require('express');

const router = express.Router(); // chain 안걸림

router.route("/01").get(function(req, res){
    res.render('hello/01');
}); 
router.route("/02").get(function(req, res){
    /* console.log(req.query.no);
    console.log(req.query.email); */
    res.render('hello/02', {
    // res.render('hello/02', req.query) 해도 되는데 파라미터가 개수가 틀리면 에러뜸. 1개 보냈는데 ejs에서 2개뽑는다던가
        // list: [],  list로 넘길 때
        no: req.query.no || "",
        email: req.query.email || "" /* default param value */
    });
}); 

module.exports = router;