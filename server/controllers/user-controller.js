const userModel = require('../models/user-model')
const jwt = require('jsonwebtoken')
const pass = require('../helper/password')

class User {
    static signup (req,res,next){
        userModel.create(req.body)
        .then((data)=>{
            let payload = {userId: data._id}
            let tmp = jwt.sign(payload, process.env.SECRET)
            res.status(201).json({token: tmp})
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
}

module.exports = User