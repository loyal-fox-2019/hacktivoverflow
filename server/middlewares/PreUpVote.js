const Question = require('../models/Question')
module.exports = function (req, res, next) {  
    Question
        .findOne({
            _id : req.params.id,
            downvote: {
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
                                    downvote: [req.userId]
                                }
                            })
            }
        })
        .then(question => {
            next()
        })
        .catch(err => {
            console.log('middlewares pre upvote errors', err)
            res.status(200).json({
                errors: ['internal server error']
            })
        })
}