const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class userController {
    static register ( req,res,next ) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            watchedTags: []
        })
            .then( user => {
                let token = generateToken({ id: user._id})
                res.status(201).json({token}) 
            })
            .catch( next )
    }

    static login ( req,res,next ) {
        User.findOne({
            email: req.body.email
        })
            .then( user => {
                if ( user )  {
                    if( checkPassword(req.body.password,user.password) ) {
                        let token = generateToken({id: user._id})
                        res.status(200).json({token})
                    } else {
                        throw {name: 'Wrong password'}
                    }
                } else {
                    throw {name:'Wrong email'}
                }
            })
            .catch( next )
    }

    static addTag(req,res,next){
        User.findOne({_id: req.decoded.id})
            .then( user => {
                if(user.watchedTags.includes(req.body.tag)) {
                    next({name: 'Tag exists'})
                } else {
                    return User.updateOne({_id:req.decoded.id},{
                        $push:{watchedTags:req.body.tag}
                    })
                }
            })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(next)
    }

    static getTag(req,res,next){
        User.findOne({_id:req.decoded.id})
        .then(user=>res.status(200).json(user.watchedTags))
        .catch(next)
    }

    static deleteTag ( req,res,next ) {
        User.updateOne({_id: req.decoded.id},{
            $pull: {watchedTags: req.body.tag}
        })
            .then( result => res.status(201).json(result))
            .catch( next )
    }
}

module.exports = userController