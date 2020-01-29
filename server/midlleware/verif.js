const jwt = require('jsonwebtoken')

class Verif{
    static authentification (req,res, next){
        try{
            let verif = jwt.verify(req.headers.token, process.env.SECRET)
            req.data = verif
            next()
        }catch(err){
            next({errorCode: 400, message: 'Badtoken'})
        }
    }
}

module.exports = Verif