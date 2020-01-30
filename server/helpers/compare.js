module.exports = function(logPass, userPass) {
  const bcrypt = require('bcrypt')
  return bcrypt.compareSync(logPass, userPass)
}
