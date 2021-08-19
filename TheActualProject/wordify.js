const bcrypt = require('bcryptjs');

exports.encrypt = (the_str) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(the_str, salt, (err, my_hash) => {
            return my_hash;
        });
    });
};

exports.isCorrectPassword = (the_str, hash) => {
    return bcrypt.compare(the_str, hash);
}

//console.log(bcrypt.compareSync(strng, hash));