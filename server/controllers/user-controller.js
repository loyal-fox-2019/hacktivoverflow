const userModel = require('../models/user-model')
const jwt = require('jsonwebtoken')
const pass = require('../helper/password')
const {OAuth2Client} = require('google-auth-library')

class User {
    static signup (req,res,next){
        userModel.create(req.body)
        .then((data)=>{
            let payload = {userId: data._id}
            let tmp = jwt.sign(payload, process.env.SECRET)
            res.status(201).json({token:tmp, id:data._id})
        })
        .catch((err)=>{
            next()
        })
    }

    static signin (req,res,next){
        let tmp = null
        userModel.findOne({email: req.body.email})
        .then((data)=>{
            tmp = data
            return pass.compare(req.body.password, data.password)
        })
        .then((data)=>{
            if(data){
                let payload = {userId: tmp._id}
                let token = jwt.sign(payload, process.env.SECRET)
                res.status(200).json({token, id: tmp._id})
            } else {
                next({errorCode: 400, message: 'Wrong Password'})
            }
        })
        .catch((err)=>{
            next()
        })
    }

    static googlesignin (req,res,next){
        const client = new OAuth2Client(process.env.GOOGLE);
        let payload = null
        client.verifyIdToken(
            {
                idToken: req.body.idToken,
                audience: process.env.GOOGLE,
                })
                .then((ticket)=>{
                    payload = ticket.getPayload()
                    return userModel.findOne({email: payload.email})
                })
                .then((data)=>{
                    if (data === null || data == undefined){
                        return userModel.create({
                            email: payload.email,
                            password: process.env.GENPASS,
                            firstName: payload.family_name,
                            lastName: payload.given_name
                        })
                    } else {
                        return data
                    }
                })
                .then((data)=>{
                    let payload = {userId: data._id}
                    let tmp = jwt.sign(payload, process.env.SECRET)
                    res.status(201).json({token: tmp, id: data._id})
                })
                .catch((err)=>{
                    next()
                })
    }
}

module.exports = User