const mongoose = require('mongoose');
const encrypt = require('../wordify');

//#region Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:12354@cluster0.ezojw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, "connection error"));
mdb.once('open', callback => {});

let userSchema = mongoose.Schema
({
    username: String,
    password: String,
    email: String,
    age: String,
    q1: String,
    q2: String,
    q3: String
});

let UserCollection = mongoose.model('User_Collection', userSchema);
//#endregion

exports.index = (req, res) => 
{
    UserCollection.find((err, user) =>
    {
        if(err) return console.error(err);
        res.render('index', 
        {
            title: 'Home Page',
            user: user
        });
    });
};

exports.create = (req, res) =>
{
    res.render('create', 
    {
        title: 'Add User'
    })
}

exports.createUser = (req, res) =>
{
    let user = new UserCollection({
        username: req.body.username,
        password: encrypt.encrypt(req.body.password),
        email: req.body.email,
        age: req.body.age,
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3
    });
    
    user.save((err, user) => {
        if(err) return console.error(err);
        console.log(req.body.name + ' created');
    });
    res.redirect('/');
};

exports.edit = (req,res) =>
{
    UserCollection.findById(req.params.id, (err, user) =>
    {
        if(err) return console.error(err);
        res.render('edit', 
        {
            title: 'Edit User',
            user
        });
    });
};

exports.editUser = (req,res) =>
{
    UserCollection.findById(req.params.id, (err, user) =>
    {
        if(err) return console.error(err);
        username: req.body.username;
        password: encrypt.encrypt(req.body.password);
        email: req.body.email;
        age: req.body.age;
        q1: req.body.q1;
        q2: req.body.q2;
        q3: req.body.q3;
        user.save((err, user) =>
        {
            if(err) return console.error(err);
            console.log(req.body.name + ' updated!');
        });
    });
    res.redirect('/');
};

exports.delete = (req,res) =>
{
    UserCollection.findByIdAndDelete(req.params.id, (err, user) =>
    {
        if(err) return console.error(err);
        console.log(user.name + ' deleted!');
    });
    res.redirect('/');
}



exports.loggedIn = (req,res) =>
{
    UserCollection.findById(req.params.id, (err, user) =>
    {
        if(err) return console.error(err);
        res.render('loggedIn', 
        {
            title: 'Logged In Page'
        });
    });
};

exports.login= (req,res) =>
{
    res.render('login', 
    {
        title: 'Login Page'
    });
};

const expressSession = require('express-session');

exports.loginTest= (req, res) =>
{
    UserCollection.findOne({username:req.body.username}, (err, user) =>
    {
        if(err) return console.error(err);
        encrypt.isCorrectPassword(req.body.password, user.password).then(isValid =>
            {
                if(isValid)
                {
                    //Login & Create session
                    expressSession.Session.connect
                }
                else
                {
                    //Wrong password/username
                }
            });
    });
}