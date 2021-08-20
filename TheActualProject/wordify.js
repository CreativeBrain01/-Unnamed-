const bcrypt = require('bcryptjs');

exports.encrypt = (the_str) => {
    let my_salt = bcrypt.genSaltSync(10);
    let my_hash = bcrypt.hashSync('bacon', my_salt);
    return my_hash;
};

exports.isCorrectPassword = (the_str, hash) => {
    return bcrypt.compareSync(the_str, hash);
}

//console.log(bcrypt.compareSync(strng, hash));