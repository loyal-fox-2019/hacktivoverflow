"use strict"

const User = require('../models/User')
const { checkPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const { email, password, username } = req.body
        User.create({
            username,
            email,
            password
        })
            .then((user) => {
                const token = createToken(user)
                res.status(201).json({ user, token })
            }).catch((err) => {
                next(err)
            })
    }
    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user === null) {
                    next({
                        status: 400,
                        message: "email/password wrong"
                    })
                } else {
                    const check = checkPassword(req.body.password, user.password)
                    if (!check) {
                        next({
                            status: 400,
                            message: "email/password wrong"
                        })
                    } else {
                        const token = createToken(user)
                        res.status(200).json({ user, token })
                    }
                }
            }).catch((err) => {
                next(err)
            });
    }
}

module.exports = UserController