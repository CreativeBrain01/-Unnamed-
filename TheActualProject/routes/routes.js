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
            user: user,
            apiInfo: this.api
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
        console.log(req.body.username + ' created');
    });

    console.log(req.body.password);
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
    console.log(req.session.user);
    UserCollection.findById(req.session.user.id, (err, user) =>
    {
        console.log(user);
        if(err) return console.error(err);
        user.username= req.body.username;
        user.password= encrypt.encrypt(req.body.password);
        user.email= req.body.email;
        user.age= req.body.age;
        user.q1= req.body.q1;
        user.q2= req.body.q2;
        user.q3= req.body.q3;
        user.save((err, user) =>
        {
            if(err) return console.error(err);
            console.log(user.username + ' updated!');
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
    UserCollection.findById(req.session.user.id, (err, user) =>
    {
        if(err) return console.error(err);
        console.log(user, req.session.user);
        res.render('loggedIn', 
        {
            title: 'Logged In Page',
            user
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

exports.api = (req,res) =>
{
    let questionData = 
    {
        q1: {"1.1":0,"1.2":0,"1.3":0,"1.4":0},  
        q2: {"2.1":0,"2.2":0,"2.3":0,"2.4":0},
        q3: {"3.1":0,"3.2":0,"3.3":0,"3.4":0}
    }

    UserCollection.find( {}, (err, users) =>
    {
        users.forEach(user => 
        {
            questionData.q1[user.q1]++,
            questionData.q2[user.q2]++,
            questionData.q3[user.q3]++
        });
        res.json(questionData);
    });
}

exports.loginTest = async function loginTest(username, pword)
{
    var usernameInput = {"username": username};
    var foundUsers;
    console.log(usernameInput);
    return await UserCollection.find(usernameInput, (err, users) =>
    {
    }).then((foundUsers) => {
        console.log("C " + foundUsers);
        console.log(pword);
        console.log(foundUsers[0].password);
        
        return [encrypt.isCorrectPassword(pword, foundUsers[0].password), foundUsers[0]._id];
    });
}
