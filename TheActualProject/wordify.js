const bcrypt = require('bcryptjs');

//Sync
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync('bacon', salt);

console.log(salt);
console.log(hash);

console.log(bcrypt.compareSync('bacon', hash));
console.log(bcrypt.compareSync('veggies', hash));

//Async (for REALLY complex salts)
const makeHash = the_str => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(the_str, salt, (err, my_hash) => {
            console.log(salt);
            console.log(my_hash);
            hashComplete(my_hash);
        });
    });
};

const hashComplete = the_hash => {
    bcrypt.compare('bacon', the_hash, (err, res) => {
        console.log(res);
    });
    bcrypt.compare('cucumber', the_hash, (err, res) => {
        console.log(res);
    });
};

makeHash("cucumber");