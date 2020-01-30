const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports = {
    authenticate : (req, res, next) => {
        try {    
            const user = verifyToken(req.headers.token)  
            User.find({"_id": user._id})
            .then (User => {    
                if (User) {
                    req.user = user.user.user
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
    authorizeQuestion : (req, res, next) => {
        Question.findById(req.params.id)
            .then(order => {
                if (order) { 
                    if (String(order.user_id) == req.user._id) {
                        next()
                    } else {
                        next({
                            status : 401,
                            message : 'Not Authorized'
                        })
                    }
                } else {
                    next({
                        status : 404,
                        message : 'order not found'
                    })
                }
            })
            .catch(next)
    },
    authorizeAnswer : (req, res, next) => {
        Answer.findById(req.params.id)
            .then(order => {
                if (order) { 
                    if (String(order.idUser) == req.user._id) {
                        next()
                    } else {
                        next({
                            status : 401,
                            message : 'Not Authorized'
                        })
                    }
                } else {
                    next({
                        status : 404,
                        message : 'order not found'
                    })
                }
            })
            .catch(next)
    }
} 