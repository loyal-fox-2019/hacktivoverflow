const { verifyToken } = require('../helpers/jwt')

function authentication ( req,res,next ) {
    if(req.headers.token) {
        let decoded = verifyToken(req.headers.token)
        
        if(decoded.id) {
            req.decoded = decoded
            next()
        } else {
            next({name:'Token unverified'})
        }
        
    } else {
        next({name:'No token'})
    }
}

module.exports = { authentication }