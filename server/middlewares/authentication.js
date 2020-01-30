const jwt = require('jsonwebtoken')

function authen(req, res, next) {

    if (req.headers.hasOwnProperty('token')) {
        const token = req.headers.token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.payload = payload
            next()
        } catch {
            // console.log("failed here")
            res.status(400).json({ message: "failed to authenticate" })
        }

    } else {
        res.status(400).json({ message: "you have to login first" })
    }
}

module.exports = authen