const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    // console.log('masuk sini')
    if(!req.headers.hasOwnProperty('token')){
        res.status(401).json({message:'You have to log in to view this page'})
    } else {
        try {
            require('dotenv').config()

            req.loggedUser = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            // console.log(req.loggedUser)
            next()
        }
        catch(e){
            res.status(400).json({message:'Token Invalid'})
        }
    }
}