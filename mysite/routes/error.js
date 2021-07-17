const logger = require('../logging');

module.exports = {
    error404: function(req,res){ 
        if(req.accepts('html')){
            res.status(404).render('error/404');
            return;
        }
        res.status(400).send({
            result: 'fail',
            data: null,
            message: "Unknown Request"
        });
    },
    
    error500: function (err, req, res, next) {
        // 로깅 처리
        logger.error(err.stack);
        // 응답
        if(req.accepts('html')){
            // res.status(500).render('error/500');       
            res.status(500).send(`<pre>${err.stack}</pre>`);
            return;
        }
        res.status(500).send({
            result: 'fail',
            data: null,
            message: err.stack
        })
    }
}