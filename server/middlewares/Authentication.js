const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {  
    if (req.headers.hasOwnProperty('token')) {
        const token = req.headers.token
        try {
            const user = jwt.verify(token, 'secretfox')
            req.userId = user.userId
            req.userEmail = user.emai
            next()
        } catch (error) {
            res.status(422).json({
                message: 'token is not valid'
            })
        }
    }else{
        res.status(422).json({
            message: 'token is not found'
        })
    }
}
