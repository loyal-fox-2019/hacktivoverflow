module.exports = function(Model){
    return function(req,res,next){
        console.log(`
        AUTHORIZATION IS RUNNING
        ========================
        `)
        
        const QueryModel = require(`../model/${Model}`)

        console.log('TCL \n============\n Model', Model)
        console.log("TCL: req.decodedUser", req.decodedUser)
        console.log('TCL \n============\n req.params.id ', req.params.id)

        QueryModel.findOne({
            _id : req.params.id
        })
        .then(result=>{
            if(result)
              {
                  if(String(result.AuthorId) === String(req.decodedUser))
                    {
                        next()
                    }
                  else
                    {
                        next({ code:403, message:'unAuthorized Access'})
                    }
                  
              }
            else 
              {
                  next({ code:404, message:"resource not found"})
              }
        })
        .catch(err=>{
            next(err)
        })

    }
}