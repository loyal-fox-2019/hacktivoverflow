'use strict';

const { verifyToken } = require('./jwt');
const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');

function authentication(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        try {
          req.userLoggedIn = verifyToken(req.headers.token);
          User.findById(req.userLoggedIn.user._id)
            .then(user => {
              if (user) {
                next();
              } else {
                next({ status: 400, message: 'Invalid access' });
              }
            })
            .catch(next);
        } catch(err) {
          next(err);
        }
    } else {
        next({ status: 401, message: 'You must log in first'});
    }
  }

function authorizationQue(req, res, next) {
    let UserId = req.userLoggedIn.user._id;
    Question.findById( req.params.id )
    .then(response => {
        if(response) {
            if(String(response.UserId) === UserId) {
                next();
            } else {
                next({ status: 400, message: 'Unauthorize' })
            }
        } else {
            next({ status: 400, message: 'Data not found' })
        }
    })
    .catch(next)
}

function authorizationAns(req, res, next) {
    let UserId = req.userLoggedIn.user._id;
    Answer.findById( req.params.id )
    .then(response => {
        if(response) {
            if(String(response.UserId) === UserId) {
                next();
            } else {
                next({ status: 400, message: 'Unauthorize' })
            }
        } else {
            next({ status: 400, message: 'Data not found' })
        }
    })
    .catch(next)
}

module.exports = {
    authentication,
    authorizationQue,
    authorizationAns
}