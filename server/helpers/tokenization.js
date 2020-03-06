const jwt = require('jsonwebtoken');

function tokenization(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = tokenization;