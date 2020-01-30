const bcrypt = require('bcrypt')
const saltRounds = 10

function passwordHash(password) {
    return new Promise((res, rej) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hashedPass) {
                if (err) {
                    rej(err)
                } else {
                    res(hashedPass)
                }
            })
        })
    })
}

module.exports = passwordHash