'use strict'

const errorHandler = (err, req, res, next) => {
    let responseStatus = null
    let responseMessage = null

    switch (err.name) {
        case 'ValidationError':
            responseStatus = 400
            responseMessage = []
            Object.keys(err.errors).forEach(function (validationError) {
                responseMessage.push(err.errors[validationError]['message'])
            })
            break
        default:
            responseStatus = err.status || 500
            responseMessage = err.message || `internal server error`
            break
    }
    // console.log(err)
    // res.send(err)
    res.status(responseStatus).json({
        error: {
            message: responseMessage

        }
    })
}

module.exports = errorHandler