const bcrypt = require('bcrypt')

function cocokPass(passMasuk, passDb) {
    const cocok = bcrypt.compareSync(passMasuk, passDb)
    return cocok
}

module.exports = cocokPass