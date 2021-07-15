module.exports = function (req, res, next) {
    if(req.session.authUser == null){
        res.redirect('/user/login');
        return;
    }
    next();
}