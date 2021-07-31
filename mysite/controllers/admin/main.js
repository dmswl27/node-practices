const { updateLocale } = require('moment');
const models = require('../../models');
const fs = require('fs');

module.exports = {
    index: async function(req, res, next) {
        try {
            const result = await models.Site.findOne({
                attributes: ['title', 'welcome', 'profile', 'description']
            });
            res.render('admin/main', {site: result});
        } catch(err) {
            next(err);
        }
    },
    update: async function (req, res, next) {
        try {
            const file = req.file;
            let url = null;

            if(file){
                const storeDirectory = path.join(path.dirname(require.main.filename),  process.env.STATIC_RESOURCES_DIRECTORY,  process.env.GALLERY_STORE_LACATION );
                console.log("storeDirectory" + storeDirectory);
                const url = path.join(process.env.GALLERY_STORE_LACATION, file.filename) + path.extname(file.originalname);
                console.log("url" + url);
                const storePath = path.join(storeDirectory, file.filename) + path.extname(file.originalname);

                fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
                const content = fs.readFileSync(file.path);
                fs.writeFileSync(storePath, content, {flag:'w+'});

            }
            
            await models.Site.update(Object.assign({
                title: req.body.title,
                welcome: req.body.welcome,
                description: req.body.description
            }, url ? {
                profile: url.replace(/\\/gi, '/')
            } : null), {
                where: {
                }
            });

            req.app.siteTitle = req.body.title;

            res.redirect('/admin');
            
        } catch (error) {
            next(error);
        }
    }
}