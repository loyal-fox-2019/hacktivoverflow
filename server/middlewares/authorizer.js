const Question = require('../models/questionModel');

module.exports = (req,res,next) => {
    console.log('masuk authorizer')
    Question.find({
        _id : req.params._id
    })
    .then(response => {
        console.log(req.userLogged.email)
        console.log(response.author)
        // if(req.userLogged.email === response.author){
        //     next()
        // } else {
        //     res.status(401).json({message : 'unauthorized'})
        // }
    })
};
