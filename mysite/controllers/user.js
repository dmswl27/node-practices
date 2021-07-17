const models = require('../models');

module.exports = {
    joinsuccess: function(req, res) {
        res.render('user/joinsuccess');
    },
    join: function(req, res) {
        res.render('user/join');
    },
    _join: async function(req, res) {
        const result = await models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender
        });
        console.log(result);
        res.redirect('/user/joinsuccess');
    },
    login: function(req, res) {
        res.render('user/login');
    },
    _login: async function(req, res) {
        const user = await models.User.findOne({
            attributes: ['no', 'name', 'role'],
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        
        if(user == null){
            res.render('user/login', Object.assign(req.body, {
                result: 'fail',
                password: ''    
            }));
            return;
        }

        // 로그인 처리
        req.session.authUser = user;
        res.redirect('/');
    },
    logout: async function(req, res){
        await req.session.destroy();
        res.redirect("/");
    },
    update: async function(req, res, next) {
        try{
            const user = await models.User.findOne({
                attributes: ['name', 'email', 'gender'],
                where: {
                    no: req.session.authUser.no
                }
            });
            res.render("user/update" , {
                user: user
            });
        } catch(e){
            next(e);
        }
        
    },
    _update: async function (req, res, next) {
        try{
            const {[req.body.password == '' ? 'password' : '']: remove, ...updateObject} = req.body;
            await models.User.update(updateObject, {
                where: {
                    no: req.session.authUser.no    
                }
            });
            res.redirect("/");
        }catch(e){
            // err.name , err.message, err.stack
            next(e);
        }
        

    }
}