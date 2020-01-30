const bcrypt = require('bcrypt')

function hash(password){
    const SaltRounds = 5
    const salt = bcrypt.genSaltSync(SaltRounds);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed
}

function compare(password, hashed){
    const compared = bcrypt.compareSync(password, hashed);
    return compared
}

module.exports = {
    hash,compare
}