const express = require('express');
const pug = require('pug');
const routes = require('./routes/routes');
const path = require('path');
const expressSession = require('express-session');

const app = express();

app.use(expressSession({
    secret: 'Suction Cup Man Is Coming Around',
    saveUninitialized: true,
    resave: true
}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedParser = express.urlencoded({ extended: false });

app.use(expressSession({
    secret: 'CAN’T GO DOWN DUMBA**! I CAN ONLY GO UP',
    saveUninitialized: true,
    resave: true
}));

app.get('/', routes.index);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createUser);
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editUser);
app.get('/delete/:id', routes.delete);
app.get('/login', routes.login);
app.post('/login', urlencodedParser, routes.loginTest);
app.listen(3000);