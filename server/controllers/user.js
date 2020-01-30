"use strict"

const User = require('../models/user')
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')

class UserController {
    static create(req, res, next) {
        const obj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(obj)
            .then(data => {
                let token = jwt.generateToken(data)
                res.status(201).json({
                    token,
                    data
                })
            })
            .catch(next)

    }

    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    next({
                        message: 'email/password salah'
                    })
                } else {
                    if (!bcrypt.checkPassword(req.body.password, user.password)) {
                        next({
                            message: 'email/password salah'
                        })
                    } else {
                        let token = jwt.generateToken(user)
                        res.status(201).json({
                            token,
                            user
                        })
                    }
                }
            })
            .catch(next)
    }
}

module.exports = UserController