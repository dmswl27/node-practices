const models = require('../models');

module.exports = {
    checkemail: async function (req, res, next) {
        console.log(req.query.email);
        try{
            const user = await models.User.findOne({
                atrributes: ['no'],
                where:{
                    email: req.query.email || ''   // email? xxx 으로 들어오는거는 query 인가 
                }
            });
            res.send({
                result: 'success',
                data: user != null,
                message: null
            });
    
        } catch(err) {
        next(err);
        }
    }
}