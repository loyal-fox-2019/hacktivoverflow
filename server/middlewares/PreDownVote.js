const Question = require('../models/Question')
module.exports = function (req, res, next) {  
    Question
        .findOne({
            _id : req.params.id,
            upvote: {
                $in: [req.userId]
            }
        })
        .then(question => {
            if (!question) {
                return true
            }else{
                return Question
                            .updateOne({_id : req.params.id }, {
                                $pullAll: {
                                    upvote: [req.userId]
                                }
                            })
            }
        })
        .then(question => {
            next()
        })
        .catch(err => {
            console.log('middlewares pre downvote errors', err)
            res.status(200).json({
                errors: ['internal server error']
            })
        })
}