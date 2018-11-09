const langService = require('../services/lang.service');

module.exports = app => {

    app.get('/data', langService.middleware, (req, res) => {
        let lang = req.session.savedLang;
        let data = langService.getData(lang);
        res.json(data);
    });

    app.get('/:lang?', langService.middleware, (req, res) => {
        let lang = req.session.savedLang;
        let data = langService.getData(lang);
        
        res.render('index', data);
    });
}