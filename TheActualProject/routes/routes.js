const mongoose = require('mongoose');

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

let User = mongoose.model('User_Collection', userSchema);

exports.index = (req, res) => 
{
    User.find((err, user) =>
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

exports.createUser= (req, res) =>
{
    let user = new User({
        name: req.body.name,
        age: req.body.age,
        species: req.body.species
    });
    
    user.save((err, user) => {
        if(err) return console.error(err);
        console.log(req.body.name + ' created');
    });
    res.redirect('/');
};

exports.edit= (req,res) =>
{
    User.findById(req.params.id, (err, user) =>
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
    User.findById(req.params.id, (err, user) =>
    {
        if(err) return console.error(err);
        user.name = req.body.name;
        user.age = req.body.age;
        user.species = req.body.species;
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
    User.findByIdAndDelete(req.params.id, (err, user) =>
    {
        if(err) return console.error(err);
        console.log(user.name + ' deleted!');
    });
    res.redirect('/');
}