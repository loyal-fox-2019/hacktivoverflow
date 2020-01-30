const user = require('../models/user');
const bCrypt = require('bcrypt');
const axios = require('axios');
// const {sendMail} = require('../helpers/cron');
const mail = require('../helpers/email');
const generateConfirmationCode = require('../helpers/generateConfirmationCode');
const jwt = require('jsonwebtoken');


class controllerUser {
    static register(req, res, next) {
        let confirmationCode = generateConfirmationCode();
        let confirmationCodeHash = bCrypt.hashSync(
            confirmationCode, bCrypt.genSaltSync(10)
        );

        user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            status: "unconfirmed",
            confirmationCode: confirmationCodeHash
        }).then(response => {
            //sent email confirmation to email
            mail(req.body.email,
                "Confirmation Code",
                "Please clink link below to confirm your email : \n" +
                "http://localhost:3000/users/confirmation?id=" +
                response._id + "&code=" + confirmationCode);

            // send response to client
            res.status(201).json({
                data: response,
                message: "User successfully registered, Email confirmation has been sent to your email"
            })
        }).catch(next)
    }

    static confirmation(req, res, next) {
        user.findById(
            req.query.id
        ).then(response => {
            // compare input code and hash code
            let isCodeMatch = bCrypt.compareSync(
                req.query.code,
                response.confirmationCode
            );

            // is code match?
            if (!isCodeMatch) {
                res.send("Code Invalid, please contact the administrator")
            }

            // if match then activating user
            axios({
                method: 'patch',
                url: 'http://localhost:3000/users/activate/' + req.query.id
            }).then(result => {
                res.render("confirmation");
            })

        }).catch(next)
    }

    static activate(req, res, next) {
        // if match update status to 'active' and remove confirmationCode
        user.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    status: 'active',
                    confirmationCode: ''
                }
            }
        ).then(confirmationRes => {
            res.send("Your account successfully activated, please login to continue");
        }).catch(next)
    }

    static login(req, res, next) {
        user.findOne({
            email: req.body.email
        }).then(response => {
            //if user not found
            if (!response) throw({code: 400, errmsg: "User/ password not found"});

            //if user found comparing password
            let isPasswordMatch = bCrypt.compareSync(req.body.password, response.password);

            //if password doesn't match
            if (!isPasswordMatch) throw({code: 400, errmsg: "User/ password not found"})

            //if user status not active/ unconfirmed
            if (response.status !== 'active') {
                throw ({code: 401, errmsg: "User is not active, please check your email for activation"});
            }

            //if password match, generate token
            let token = jwt.sign({userId: response._id}, process.env.SECRET_KEY);

            //send email notification login
            mail(
                response.email,
                "Login notification",
                "You are login in time : " + new Date()
            );

            // send response to client
            res.status(200).json({
                message: "User successfully login",
                token: token,
                data: {
                    name: response.name,
                    email: response.email
                }
            })
        }).catch(next)
    }

    static currentUser(req, res, next) {
        user.findById(
            req._id
        ).then(response => {
            res.status(200).json({
                data: {
                    _id: response._id,
                    name: response.name,
                    email: response.email
                }
            })
        }).catch(next)
    }

    static viewUser(req, res, next) {
        user.findById(
            req.params.id
        ).then(response => {
            if (!response) throw({code: 400, errmsg: "User not found"});
            res.status(200).json({
                data: {
                    _id: response._id,
                    name: response.name,
                    email: response.email
                }
            })
        }).catch(next)
    }

    static addWatchTags(req, res, next) {
        user.updateOne({
            _id: req._id
        }, {
            watchTags: req.body.tags
        }).then(response => {
            res.status(200).json({
                message: "Watch tags successfully added"
            })
        }).catch(next)
    }
}

module.exports = controllerUser;