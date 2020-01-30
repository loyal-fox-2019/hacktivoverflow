const bcrypt = require('bcrypt')
const saltRounds = 4

function hashPassword(password) {
    let hashed = bcrypt.hashSync(password, saltRounds)
    return hashed
}

module.exports = hashPassword