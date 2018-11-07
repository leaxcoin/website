const mustacheExpress = require('mustache-express');
const VIEWS_PATH = __dirname + '/../views';

module.exports = app => {
    app.engine('mst', mustacheExpress());
    app.set('view engine', 'mst');
    app.set('views', VIEWS_PATH);
}