const bcrypt = require('bcrypt')

function comparePass(password, hashedPass) {
    return new Promise ((res, rej) => {
        bcrypt.compare(password, hashedPass, (err, result) => {
            if(err){
                rej(err)
            }else{
                res(result)
            }
        })
    })
}

module.exports = comparePass