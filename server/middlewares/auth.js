const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Question = require('../models/question')

module.exports = {
    authenticate : (req, res, next) => {
        try {    
            const user = verifyToken(req.headers.token)  
            User.find({"_id": user._id})
            .then (User => {    
                if (User) {
                    req.user = user.user
                    next()
                } else {
                    next({
                        message : 'user not Found',
                        status : 404
                    })
                }
            })     
            
        } catch(err) {  
            next(err)    
        }
    },
} 