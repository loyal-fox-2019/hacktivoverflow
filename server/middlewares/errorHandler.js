function errorHandler(err, req, res, next){
  let errorCode = err.errorCode || 500
  let errorMessage = err.errorMessage || 'Internal Server Error'
  let errors = []

  errors.push(errorMessage)

  if (err.name == 'ValidationError'){
    errors = []
    errorCode = 400
    for (let field in err.errors){
      errors.push(err.errors[field].message)
    }
  }

  if (err.name == 'CastError'){
    errors = []
    errorCode = 404
    errors.push(err.model.modelName + ' not found')
  }
  
  res.status(errorCode).json({errors})
}

module.exports = errorHandler