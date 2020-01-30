const jwt = require('jsonwebtoken')

module.exports = {
    generateToken : function(user){
        return jwt.sign({user}, process.env.JWT_SECRET)
    },
    verifyToken : function(token){
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}