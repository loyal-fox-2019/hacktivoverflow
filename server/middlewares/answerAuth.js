const Answer = require('../models/answer')

module.exports = {
    answerAuth : (req, res, next) => {
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