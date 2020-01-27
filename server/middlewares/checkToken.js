const jwt = require('jsonwebtoken');

const jwtUserID = (req, res, next) => {
    // console.log(req.headers.authorization);
    try {
        let token = req.headers.authorization.split(" ")[1];
        let userID = jwt.verify(token, process.env.SECRET_KEY);
        req._id = userID.userId;
        next()
    } catch (err) {
        next({code: 400, errmsg: "Token error"})
    }
};

module.exports = jwtUserID;