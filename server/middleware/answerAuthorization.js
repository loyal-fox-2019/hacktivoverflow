'use strict';

const Answer = require('../models/answer');

function answerAuthorization(req, res, next) {
    Answer.findOne({_id: req.params.id})
    .then(answer => {
        if(answer.userId != req.userId) {
            res.status(403).json({
                name: 'Forbidden',
                message: 'You dont have permission to update / delete this answer'
            })
        } else {
            next();
        }
    })
}

module.exports = answerAuthorization