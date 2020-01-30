const user = require('../models/users')
const comparePass = require('../helpers/bcryptCompare')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res, next) {
        user.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
            .then(createdUser => {
                require('dotenv').config()
                let payload = {}
                payload.id = createdUser._id
                let token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(201).json({ token, userName: createdUser.userName })
            })
            .catch(err => {
                next()
            })
    }

    static login(req, res, next){
        let userInfo
        user.findOne({email: req.body.email})
        .then(userData => {
            if(!userData){
                next({status: 404, message:'Invalid email / password'})
            }
            userInfo = userData
            return comparePass(req.body.password, userData.password)
        })
        .then(result => {
            if(!result){
                next({status: 404, message:'Invalid email / password'})
            }
            require('dotenv').config()
            let payload = {}
            payload.id = userInfo._id
            let token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(200).json({ token, userName: userInfo.userName })
        })
        .catch(err => {
            next()
        })
    }
}

module.exports = UserController