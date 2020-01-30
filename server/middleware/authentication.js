'use strict';

const Jwt = require('../helper/jwt');

function authentication(req, res, next) {
    if(!req.headers || !req.headers.token) {
        res.status(403).json({
            name: 'Forbidden',
            message: 'You have to login/register first'
        })
    } else {
        req.userId = Jwt.verifyToken(req.headers.token).id;
        next();
    }
}

module.exports = authentication;