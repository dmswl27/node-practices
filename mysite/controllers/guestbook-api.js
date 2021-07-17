const models = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');

module.exports = {
    read: async function(req, res, next) {
        try { 
            const startNo = req.query.no;
            console.log(startNo);
            const results = await models.Guestbook.findAll({
                attributes: ['no', 'name', 'message'],
                // where: (startNo > 0) ? {no: {[Op.lt]: startNo}} : {},
                where: (startNo > 0) ? {no: {[Op.lt]: startNo}} : {},
                order: [
                    ['no', 'DESC']
                ],
                limit: 3
            });
            res.send({
                result: 'success',
                data: results,
                message: null
            });
        } catch(e) {
            next(e);
        }         
    },
    add: async function (req, res, next) {
       
        try {        
            const result = await models.Guestbook.create(req.body);
            res.send({
                result: 'success',
                data: result,
                message: null
            });
        } catch(e) {
            next(e);
        }        
        
    },
    delete: async function (req, res, next) {
        try {
            const result = await models.Guestbook.destroy({
                where : {
                    [Op.and]: [{no:req.params.no}, {password: req.body.password}]
                }
            });

            res.send({
                result: "success",
                data: req.params.no,
                message: null
            })
        } catch (err) {
            next(err);
        }
        
    }
}