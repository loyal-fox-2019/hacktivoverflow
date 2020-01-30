module.exports = function(password) {
  const bcrypt = require('bcrypt')
  const saltRounds = 10

  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}
