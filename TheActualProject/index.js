const express = require('express');
const pug = require('pug');
const routes = require('./routes/routes');
const path = require('path');
const expressSession = require('express-session');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let urlencodedParser = express.urlencoded({ extended: false });

app.use(expressSession({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true
}));

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

app.get('/', routes.index);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createUser);
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editUser);
app.get('/delete/:id', routes.delete);
app.get('/login', routes.login);
app.post('/login', urlencodedParser, routes.loginTest);
app.listen(3000);