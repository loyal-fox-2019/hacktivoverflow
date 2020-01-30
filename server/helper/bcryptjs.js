const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(5)

function generateHash( password )
  {
    return bcryptjs.hashSync(password, salt)
  }

function comparePassword( enterPassword, queryPassword )
  {
      return bcryptjs.compareSync( enterPassword, queryPassword )
  }

module.exports ={
    generateHash,
    comparePassword
}