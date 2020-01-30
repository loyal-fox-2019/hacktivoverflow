

function errorHandler(err, req, res, next) {

   console.log(err)

   let errorCode = 500
   let message = 'Internal server error'

   if(err.errorCode) errorCode = err.errorCode
   if(err.message) message = err.message

   res.status(errorCode).json({message})
}

module.exports = errorHandler