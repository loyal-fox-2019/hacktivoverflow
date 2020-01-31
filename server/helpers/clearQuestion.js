const Question = require('../models/Question')

function post () {
    Question
        .find()
        .then(questions => {
            const nPromise = []
            questions.forEach(question => {
                if (question.downvote.length >= 3) {
                    nPromise.push(
                        Question
                            .deleteOne({
                                _id: question._id
                            })
                    )
                }
            })
            return Promise.all(nPromise)
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
module.exports = post