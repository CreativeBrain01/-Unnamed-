const express = require('express');
const pug = require('pug');
const routes = require('./routes/routes');
const path = require('path');
//const { ppid } = require('process');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedParser = express.urlencoded
({
    extended: false
});

app.get('/', routes.index);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createPerson);
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editPerson);
app.get('/delete/:id', routes.delete);

app.listen(3000);
