
const Question = require('../models/question')

module.exports = {
    questionAuth : (req, res, next) => {
        Question.findById(req.params.id)
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