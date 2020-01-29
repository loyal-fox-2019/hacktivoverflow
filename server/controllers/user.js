const userModel = require('../models/User');
const tokenization = require('../helpers/tokenization');
const generatePassword = require('../helpers/generatePassword');
const nodemailer = require('nodemailer');
const ObjectId = require('mongoose').Types.ObjectId;

class User {
    static register(req, res, next) {
        console.log('MASUK req.body', req.body);
        
        let password = generatePassword()
        console.log('abis generate password', password);
        userModel
            .create({
                email: req.body.email,
                name: req.body.name,
                username: req.body.email,
                password,
                isConfirm: false
            })
            .then((user) => {
                console.log('udah create user', user);
                
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
                    <p> Here, you can :
                        try {
                            to ask your error();
                        }
                        
                        OR
                        
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

                console.log('mau kirim email');
                
                return transporter.sendMail(mailOptions);
            }).then((info) => {
                res.status(200).json(info)
            }).catch(next);
    }

    static getConfirmData(req, res, next) {
        userModel
            .find({
                _id: ObjectId(req.params.id)
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
        let name
        userModel
            .updateOne({
                email: req.body.email,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                isConfirm: true
            })
            .then((user) => {
                name = user.name
                return tokenization({
                    _id: user._id,
                    name: user.name
                })
            }).then((token) => {
                res.status(201).json({
                    name,
                    token
                })
            }).catch(next);
    }

    static login(req, res, next) {

    }

    static oauth(req, res, next) {

    }
}

module.exports = User;