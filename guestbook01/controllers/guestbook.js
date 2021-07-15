const { render } = require('ejs');
const model = require('../models/guestbook');

module.exports = {
    index: async function(req, res){
        const results = await model.findAll();
        res.render('index', {
            list: results || []
        });
    },
    form: function(req, res){
        res.render('form');
    },
    add:async function(req, res){
        const results = await model.insert(req.body);
        console.log(results);
        res.redirect('/');
    },
    delete: async function(req, res){
        console.log(req.params.no);
        res.render('delete',{
            no: req.params.no
        });
    },
    _delete: async function(req, res){
        const guestbook = {
            no: req.params.no,
            password: req.body.password
        }
        const results = await model.delete(guestbook);
        console.log(results);
        res.redirect('/');
    }
}