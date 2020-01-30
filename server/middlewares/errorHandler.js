function errorHandler ( err,req,res,next ) {
    if(err.name==="MongoError" && err.code==11000) {
        if(err.keyValue.name) {
            res.status(400).json({errors: ['Name must be unique']})
        } else if(err.keyValue.email) {
            res.status(400).json({errors: ['Email must be unique']})
        }
    } else if (err.name==='ValidationError') {
        if(err.errors.name) {
            res.status(400).json({errors: [err.errors.name.message]})
        } else if(err.errors.email) {
            res.status(400).json({errors: [err.errors.email.message]})
        } else if (err.errors.password) {
            res.status(400).json({errors: [err.errors.password.message]})    
        } else if (err.errors.description) {
            res.status(400).json({errors: [err.errors.description.message]})    
        } else if (err.errors.tags) {
            res.status(400).json({errors: [err.errors.tags.message]})    
        }
    } else if (err.name==='Wrong email') {
        res.status(400).json({errors: ['Wrong email.']})
    } else if (err.name==='Wrong password') {
        res.status(400).json({errors: ['Wrong password.']})
    } else if (err.name==='Tag exists') {
        res.status(400).json({errors: ['You have added this tag.']})
    } else {
        res.status(500).json({errors: ['Internal server error.']})
    }
}

module.exports = { errorHandler }