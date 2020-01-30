const jwt = require('../helpers/jwt');

module.exports = (req,res,next) => {
    try{
        let userLogged = jwt.tokenVerifier(req.headers.token)
        req.userLogged = userLogged
        next()
    } catch (err){
        next('invalid-token')
    }
};
