const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {compare} = require('../helpers/encryption')
class UserController{
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