'use strict';

const User = require('../models/user');
const Jwt = require('../helper/jwt');
const Bcrypt = require('../helper/bcrypt');

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
        User.create(newUser)
        .then(user => {
            res.status(201).json({
                message: 'New user has been created',
                body: user
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static login(req, res, next) {
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                throw {
                    name: 'BadRequest',
                    message: 'Incorect email/password'
                }
            } else {
                const verifyPassword = Bcrypt.comparePassword(req.body.password, user.password)
                if(!verifyPassword) {
                    throw {
                        name: 'BadRequest',
                        message: 'Incorect email/password'
                    }
                } else {
                    const payload = {id: user._id};
                    const token = Jwt.generateToken(payload);
                    res.status(200).json({
                        message: 'OK',
                        body: token
                    })
                }
            }
        })
        .catch(error => {
            next(error);
        })
    }

    static getPayload(req, res, next) {
        const payload = Jwt.verifyToken(req.headers.token);
        res.status(200).json({
            message: 'OK',
            body: payload.id
        })
    }
}

module.exports = UserController;