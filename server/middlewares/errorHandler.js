module.exports ={
    errorHandler: function(err,req,res,next) {
        console.log(err)
    let statusCode;
    let messageError = []
    if(err.status && err.message){
        statusCode = err.status
        messageError.push(err.message)
    }
    else{
        switch(err.name){
            case'ValidationError':
                statusCode = 422
                for(error in err.errors){
                    messageError.push(err.errors[error].message)
                }
                break
            case 'JsonWebTokenError':
                statusCode = 400
                messageError.push('invalid token')
                break
            default :
                statusCode = 500
                messageError.push('Internal service error')
        }
    }
    res.status(statusCode).json({errors: messageError})
}}