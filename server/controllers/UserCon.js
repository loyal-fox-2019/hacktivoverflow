const user = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {commparePassword} = require('../helpers/bcrypt')

class UserCon {
    static register(req,res,next){
        user.create(req.body)
            .then(data => {
                const token = generateToken(data)
                const {email,_id,username} = data
                res.status(201).json({
                    message: 'register succsesfully',
                    token: token,
                    user: {
                        email,
                        _id,
                        username,
                    }
                })
            })
            .catch(next)
    }
    static login(req,res,next){
        user.findOne({
            email : req.body.email
        })
            .then(data => {
                if(data){
                    if(commparePassword(req.body.password,data.password)){
                        const token = generateToken(data)
                        const {email,_id,username,tags} = data
                        res.status(201).json({
                            message: 'login succsesfully',
                            token: token,
                            user: {
                                email,
                                _id,
                                username,
                                tags
                            }
                        })
                    }else{
                        next({
                            status: 403,
                            message: 'password is wrong'
                        })
                    }
                }else{
                    next({
                        status:403,
                        message: 'user not found'
                    })
                }
            })
            .catch(next)
    }

}

module.exports = UserCon