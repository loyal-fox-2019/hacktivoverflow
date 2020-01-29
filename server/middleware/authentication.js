const { verifyToken } = require('../helper/jwt')
const User = require('../model/User')

module.exports = (req,res,next)=>{
    console.log('AUTHENTICATION IS RUNNING')

    const decoded = verifyToken( req.headers.access_token )
    
    User.findOne({
        _id:decoded._id
    })
    .then(result=>{
        if( result )
          { 
              req.decodedUser = result._id
              console.log("TCL: req.decodedUser", req.decodedUser)
              next()
          }
        else
          {
              throw(err)
          }

    })
    .catch(err=>{
        next({ code:400, message:'fail to satisfy requirement'})
    })
    


}