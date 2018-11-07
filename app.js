const express = require("express");

const templateService = require('./services/template.service');
const sessionService = require('./services/sesssion.service');
const controllers = require('./controllers/index');

const app = express();
const port = 3000;

app.use(express.static('public'));
sessionService(app);
templateService(app);
controllers(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});