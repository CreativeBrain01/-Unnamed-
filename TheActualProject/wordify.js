const bcrypt = require('bcryptjs');

const makeHash = the_str => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(the_str, salt, (err, my_hash) => {
            return my_hash;
        });
    });
};