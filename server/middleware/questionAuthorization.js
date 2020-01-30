'use strict';

const Question = require('../models/question');

function questionAuthorization(req, res, next) {
    Question.findOne({_id: req.params.id})
    .then(question => {
        if(question.userId == req.userId) {
            next();
        } else {
            res.status(403).json({
                name: 'Forbidden',
                message: 'You cannot update / delete this question'
            })
        }
    })
}

module.exports = questionAuthorization;