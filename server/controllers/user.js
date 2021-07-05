const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')
const { hashPassword } = require('../helpers/bcrypt')

class UserCtr {
    static register(req, res, next) {
        const password = req.body.password
        const hashPass = hashPassword(password)

        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if(!user) {
                let token = generateToken({ user }, process.env.JWT_PRIVATE_KEY)
                User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashPass
                })
                .then((user) => {
                    res.status(201).json({
                        message: "register successfully!",
                        token,
                        user
                    })
                })
            } else {
                next({
                    status: 400,
                    message: "email already registered!"
                })
            }
        })
        .catch(next)
    }

    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password

        User.findOne({
            email
        })
        .then((user) => {
            if (user === null) {
                res.status(400).json({
                    message: "email not found!"
                })
            } else {
                let hash = user.password
                let checked = checkPassword(password, hash)
                let token = generateToken({ user }, process.env.JWT_PRIVATE_KEY)

                if (checked) {
                    res.status(200).json({
                        message: "login successfully!",
                        token,
                        user
                    })
                } else {
                    next({
                        status: 400,
                        message: "email/password wrong!"
                    })
                }
            }
        })
        .catch(next)
    }
}

module.exports = UserCtr