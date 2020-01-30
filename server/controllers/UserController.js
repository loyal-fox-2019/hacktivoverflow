const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {compare} = require('../helpers/encryption')
const verifyGoogle = require('../helpers/verifyGoogle')

class UserController{
    static gsignin(req,res,next){
        // console.log('masuk gsignin', req.body)
        let email=null
        let name=null
        const token = req.body.id_token
        const payload = verifyGoogle(token)
        // console.log(payload,'google sign in')
        payload.then(data=>{
            // console.log(data, 'payloaaaaaaaaaaaad')
            email = data.email
            name = data.name
            return User.findOne({
                email
            })
        })
        .then(result=>{
            // console.log(result,'=============')
            if(result){
                return result
            }else{
                // console.log(process.env.DEFAULT_PASSWORD,'env')
                return User.create({
                    username: name,
                    email,
                    password: process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then(user=>{
            // console.log(user, )
            // console.log(user, '{{{{{{')
            let payload={
                _id: user._id,
                username: user.username,
                email: user.email
            }
            const token = generateToken(payload)
            res.status(200).json({
                message: 'User Signed In',
                token,
                payload
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    static register(req,res,next){
        console.log('masuk register', req.body)
        const {username, email, password} = req.body
        let user = null
        User.create({
            username,
            email, 
            password
        })
        .then(result=>{
            console.log(result)
            user = result
            let payload={
                _id: user._id,
                email: user.email,
                username: user.username
            }
            const token = generateToken(payload)
            res.status(201).json({
                token,
                payload
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err.message)
        })
    }
    static login(req,res,next){
        // console.log(req.body)
        let user= null
        User.findOne({ email: req.body.email })
        .then(result=>{
            // console.log(result)
            if(result){
                // console.log(compared)
                const compared = compare(req.body.password, result.password)
                if(compared){
                    user = result
                    let payload={
                        _id: user._id,
                        email: user.email,
                        username: user.username
                    }
                    const token = generateToken(payload)
                    res.status(200).json({
                        token,
                        payload
                    })
                }else{
                    res.status(400).json({
                        message: 'wrong username/password'
                    })
                }
            }else{
                res.status(401).json({
                    message: "user's not registered"
                })
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    
    }
}

module.exports = UserController