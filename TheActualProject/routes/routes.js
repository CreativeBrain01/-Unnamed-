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

let personSchema = mongoose.Schema
({
    name: String,
    age: String,
    species: String
});

let Person = mongoose.model('People_Collection', personSchema);

exports.index = (req, res) => 
{
    Person.find((err, person) =>
    {
        if(err) return console.error(err);
        res.render('index', 
        {
            title: 'Home Page',
            people: person
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

exports.createPerson= (req, res) =>
{
    let person = new Person({
        name: req.body.name,
        age: req.body.age,
        species: req.body.species
    });
    
    person.save((err, person) => {
        if(err) return console.error(err);
        console.log(req.body.name + ' created');
    });
    res.redirect('/');
};

exports.edit= (req,res) =>
{
    Person.findById(req.params.id, (err, person) =>
    {
        if(err) return console.error(err);
        res.render('edit', 
        {
            title: 'Edit User',
            person
        });
    });
};

exports.editPerson = (req,res) =>
{
    Person.findById(req.params.id, (err, person) =>
    {
        if(err) return console.error(err);
        person.name = req.body.name;
        person.age = req.body.age;
        person.species = req.body.species;
        person.save((err, person) =>
        {
            if(err) return console.error(err);
            console.log(req.body.name + ' updated!');
        });
    });
    res.redirect('/');
};

exports.delete = (req,res) =>
{
    Person.findByIdAndDelete(req.params.id, (err, person) =>
    {
        if(err) return console.error(err);
        console.log(person.name + ' deleted!');
    });
    res.redirect('/');
}