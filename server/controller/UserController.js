const User = require('../model/User')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcryptjs')

class UserController
{
    static test(req,res)
      {
          res.send('hello user connected')
      }


    static findAllUser(req,res,next)
      {
          User.find()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static register(req,res,next)
      {
          const { username, email, password } = req.body

          User.create(
              { username, email, password }
          )
          .then(result=>{
              res.status(201).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
    

    static logIn(req,res,next)
      {
          const { email, password } = req.body
          if(!email || !password)
            throw({ status : 403, message: 'Requirement not satisfied'})

          User.findOne({
              email
          })
          .then(result=>{
              if(!result)
                throw({ status: 404, message: 'email & password combination wrong || user not found'})
              else if ( comparePassword(password, result.password) ){
                    res.status(200).json({ 
                        username:result.username, 
                        access_token : generateToken({ _id:result._id}) 
                    })
                }
              else
                throw ({code:403, message:'email & password combination wrong || user not found'})

          })
          .catch(err=>{
              next(err)
          })
      }

    
    static updateTag(req,res,next)
      {
        const { push, pull } = req.body

        let updateScript = {}
        if(push){
            updateScript.$addToSet = { 
                                      watchedTag : {
                                                  $each : push
                                                }
                                     }
        }
      //   console.log(`TCL: updateScript`, updateScript)

        User.updateOne(
            { _id: req.decodedUser._id},
            updateScript
        )
        .then(result=>{
              if(pull){
                  return User.updateOne(
                      { _id: req.decodedUser._id},
                      {$pull : { 
                              watchedTag : { 
                                          $in:pull
                                        }
                      }}
                  )
              }
              else
                  res.status(200).json(result)
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })

      }


    static masterDelete(req,res,next)
      {
          User.remove()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


}

module.exports = UserController