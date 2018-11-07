const session = require('express-session');

module.exports = app => {
    app.use(session({
        secret: 'vSVauxvNUffYjPFk5e8yGhd9KeKJL7',
        cookie: {},
        saveUninitialized: true,
        resave: false
    }));
}