const bcrypt = require('bcryptjs')

module.exports = {
    hash: function (password) {
        return bcrypt.hashSync(password, 7)
    },
    dehash: function (pass, pass_db) {
        return bcrypt.compareSync(pass, pass_db)
    }
}