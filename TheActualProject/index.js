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
app.get('/loggedIn', routes.loggedIn);
app.get('/api', routes.api);


app.post('/login', urlencodedParser, (req, res) => {
    var results = routes.loginTest(req.body.username, req.body.pword);
    results.then(results =>
    {
        var canLogin = results[0];
        var id = results[1];
        console.log("canLogin: " + canLogin, results);
        if(canLogin)
        {
            console.log("Success");
            //Login Success
            req.session.user = {
                isAuthenticated: true,
                username: req.body.username,
                id
            }
            res.redirect('/loggedIn'); //redirect to user page
        } else {
            //Login Fail
            console.log("Fail");
            res.redirect('/'); //tell user that the login info is incorrect
        }
    })
});

app.get('logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000);