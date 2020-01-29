const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const generatePassword = require('../helpers/generatePassword');
const nodemailer = require('nodemailer');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const hashPassword = require('../helpers/hashPassword');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class User {
    static register(req, res, next) {
        let password = generatePassword()
        userModel
            .create({
                email: req.body.email,
                name: req.body.name,
                username: req.body.email,
                password,
                isConfirm: false
            })
            .then((user) => {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: req.body.email,
                    subject: 'no-reply: Register Confirmation for Error Handler',
                    html: `
                    <h1>1 Step Closer to Error Handler</h1>
                    <p> 
                        Here, you can :
                        try {
                            to ask your error();
                        }
                    </p> 
                    <p>OR</p>
                    <p>
                        catch {
                            other people error();
                        }
                    </p>

                    <p>Click or copy link below to confirm your registration :</p>
                    <a href='${process.env.WEB_URL}/register/${user._id}'>
                        ${process.env.WEB_URL}/register/${user._id}
                    </a>
                    <p>And here is your current password, you can change it later while confirming</p>
                    <p style="font-weight:bold;">${password}</p>
                `
                }
                
                return transporter.sendMail(mailOptions);
            }).then((info) => {
                res.status(200).json(info)
            }).catch(next);
    }

    static getConfirmData(req, res, next) {
        userModel
            .findOne({
                _id: ObjectId(req.params.id),
                isConfirm: false
            })
            .then((user) => {
                if (!user) {
                    let err = new Error('User not register yet or registration confirmation is complete')
                    err.statusCode = 400
                    err.errMessage = 'User not register yet or registration confirmation is complete'
                    throw err
                } else {
                    res.status(200).json(user)
                }
            }).catch(next);
    }

    static confirm(req, res, next) {
        let userData

        userModel
            .findOne({
                _id: ObjectId(req.params.id),
                isConfirm: false
            })
            .then((user) => {
                if (!user) {
                    let err = new Error('This page is not valid')
                    err.statusCode = 404
                    err.errMessage = 'This page is not valid'
                    throw err
                } else if (!bcrypt.compareSync(req.body.password, user.password)) {
                    let err = new Error('Invalid password')
                    err.statusCode = 404
                    err.errMessage = 'Invalid password'
                    throw err
                } else if (!req.body.newPassword) {
                    let err = new Error('New password required')
                    err.statusCode = 404
                    err.errMessage = 'New password required'
                    throw err
                } else {
                    userData = {
                        _id: user._id,
                        name: user.name
                    }
                    return userModel.updateOne({
                        _id: ObjectId(req.params.id),
                        isConfirm: false
                    }, {
                        username: req.body.username,
                        password: hashPassword(req.body.newPassword),
                        isConfirm: true
                    })
                }
            }).then((result) => {
                return jwt.sign(userData, process.env.JWT_SECRET)
            }).then((token) => {
                res.status(201).json({
                    name: userData.name,
                    token
                })
            }).catch(next);
    }

    static login(req, res, next) {
        let name
        userModel
            .findOne({
                $or: [
                    {username: req.body.username},
                    {email: req.body.username}
                ]
            })
            .then((user) => {
                if (!user) {
                    let err = new Error('You are not registered')
                    err.statusCode = 404
                    err.errMessage = 'You are not registered'
                    throw err
                } else if (!bcrypt.compareSync(req.body.password, user.password)) {
                    let err = new Error('Invalid username or password')
                    err.statusCode = 404
                    err.errMessage = 'Invalid username or password'
                    throw err
                } else {
                    name = user.name
                    return jwt.sign({
                        _id: user._id,
                        name: user.name
                    }, process.env.JWT_SECRET)
                }
            }).then((token) => {
                res.status(200).json({
                    name,
                    token
                })
            }).catch(next);
    }

    static oauth(req, res, next) {
        let gPayload;
        let userStatus = 200;
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(({payload}) => {
            gPayload = payload
            return userModel
                .findOne({
                    email: payload.email
                })
        })
        .then((user) => {

            if (user) {
                return user
            } else { 
                userStatus = 201;
                return userModel
                    .create({
                        name: gPayload.name,
                        email: gPayload.email,
                        username: gPayload.email,
                        password: generatePassword(),
                        isConfirm: true
                    })
            }
        }).then((registeredUser) => {
            return jwt.sign({
                _id: registeredUser._id,
                name: registeredUser.name
            }, process.env.JWT_SECRET)
        }).then((token) => {
            res.status(userStatus).json({
                token,
                name: gPayload.name
            })
        }).catch(next);
    }
}

module.exports = User;