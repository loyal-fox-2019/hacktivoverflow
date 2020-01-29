module.exports = (err,req,res,next)=>{
    console.log(`
        ERROR HAPPENED - LOG FROM ERROR HANDLER
        =======================================
        ${err}
        =======================================
    `);
    
    let status = err.status || 500
    let message = err.message || 'INTERNAL SERVER ERROR'

    switch (err.name) {
        case 'ValidationError':
            status= 400

            let arrayMessage = []
            for (const key in err.errors) {
                arrayMessage.push(err.errors[key].message)
            }
            message = arrayMessage
            break;
    
        case 'MongoError':
            status= 406
            if(err.code === 11000)
                message = `${Object.keys(err.keyPattern)} has already been used`
            break

        default:
            break;
    }


    res.status(status).json({ 
      errName : err.name, 
      status, message 
    })
}