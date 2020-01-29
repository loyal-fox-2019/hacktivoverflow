const jwt = require('jsonwebtoken')

module.exports = {
    genToken: function (payload) {
        return jwt.sign(payload, process.env.JWT)
    },
    verifyToken: function (token) {
        return jwt.verify(token, process.env.JWT)
    }
}