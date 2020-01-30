module.exports = (err,req,res,next) => {
    console.log(err)
    let statusCode;
    let messageError = []
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
    res.status(statusCode).json({errors: messageError})
}