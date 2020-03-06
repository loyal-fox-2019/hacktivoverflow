const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword
}

module.exports = hashPassword;