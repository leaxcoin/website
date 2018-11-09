const VIEWS_PATH = __dirname + '/../views';

module.exports = app => {
    app.set('view engine', 'pug')
    app.set('views', VIEWS_PATH);
}