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
            title: 'People List',
            people: person
        });
    });
};