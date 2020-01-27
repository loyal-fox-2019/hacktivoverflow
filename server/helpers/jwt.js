const jwt = require('jsonwebtoken')

function generateToken(payload){
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token
}

function decodeToken(token){
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

module.exports = {
    generateToken,decodeToken
}