const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const { generateJWT, verifyJWT } = require('../helpers/jwt')

class UserController {
    static glogin(req,res,next){
        let userData = {
            name: req.user.name,
            email: req.user.email,
            password: process.env.DEFAULT_PASS
        }
        UserModel.findOne({
            email: userData.email
        })
        .then(user=>{
            if(user){
                return user
            }
            else {
                return UserModel.create(userData)
            }
        })
        .then(result=>{
            let payload = {
                userId: result._id,
                name: result.name,
                email: result.email
            }
            let token = generateJWT(payload)
            res.status(200).json({token, userId: payload.userId, username: payload.name})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static register(req,res,next){
        let {name,email,password} = req.body
        UserModel.create({
            name,
            email,
            password
        })
        .then(result=>{
            let payload = {
                userId: result._id,
                name: result.name,
                email: result.email
            }
            let token = generateJWT(payload)
            res.status(201).json({token, userId: payload.userId, username: payload.name})
        })
        .catch(err=>{
            let errors = []
            for(let key in err.errors){
                errors.push(err.errors[key].message)
            }
            res.status(400).json({errors})
        })
    }
    
    static login(req,res,next){
        UserModel.findOne({
            email: req.body.email
        })
        .then(result=>{
            if(!result){
                throw {
                    code: 400,
                    message: "Wrong email/password"
                }
            }
            else {
                if(bcrypt.compareSync(req.body.password, result.password)){
                    let payload = {
                        userId: result._id,
                        name: result.name,
                        email: result.email
                    }
                    let token = generateJWT(payload)
                    res.status(200).json({token, userId: payload.userId, username: payload.name})
                }
                else {
                    throw {
                        code: 400,
                        message: "Wrong email/password"
                    }
                }
            }
        })
        .catch(err=>{
            res.status(err.code).json({
                message: err.message
            })
        })
    }
}

module.exports = UserController